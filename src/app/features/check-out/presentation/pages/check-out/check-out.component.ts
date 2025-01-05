import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Branch, ConfigModel, PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {PlaceOrderBody} from "../../../../../common/data-classes/PlaceOrderBody";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {ORDER_BODY, SELECTED_BRANCH, USER_INFO} from "../../../../../common/utils/constants";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {ToastService} from "../../../../../common/services/toast.service";
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {PayMobApi} from "../../../../../common/apis/pay-mob-api";
import {MyFatoorahPaymentMethod} from "../../../../../common/data-classes/MyFatoorahPaymentMethod";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../../environments/environment.prod";
import {UserInfo} from "../../../../../common/data-classes/UserInfo";


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [DatePipe]
})
export class CheckOutComponent implements OnInit {

  @ViewChild('openMyFatoorahElem') openMyFatoorahElem!: ElementRef
  activeTab = 'shipping'
  loading = false
  addresses: AddressModel[] = []
  selectedAddressId: number = 0
  cartProductItems: CartProductItem[] = []
  totalPrice: number = 0
  selectedBranch: Branch | null = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
  couponModel: CouponModel | null = null
  placingOrder = false
  errorMessage: string | null = null
  orderId: string = ""
  configModel: ConfigModel | null = null
  myFatoorahPaymentMethods: MyFatoorahPaymentMethod[] = []
  placeOrderBody: PlaceOrderBody | null = null
  discountAmountFromCoupon: number = 0
  deliveryCharge: number = 0

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private router: Router,
    private analyticsService: AnalyticsService,
    private configModelService: ConfigModelService,
    private payMobApi: PayMobApi,
    private route: ActivatedRoute,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.addresses = addresses
      },
      error: (err) => {
        this.loading = false
        console.log("Error received inside get Address", err)
      }
    })
    AppEventBroadcaster.on({event: AppEvent.userAddressesChanged}).subscribe({
      next: (_) => {
        this.reloadUserAddresses()
      }
    })
    this.cartProductsService.cartProductsSubject.subscribe({
      next: (cartProducts) => {
        this.cartProductItems = cartProducts
        for (let cartProduct of cartProducts) {
          let price = ProductPriceUtil.calculatePrice(cartProduct)
          this.totalPrice += (cartProduct.count * price)
        }
      }
    })
    this.configModelService.configModelSubject.subscribe({
      next: (configModel) => {
        this.configModel = configModel
      }
    })
    // let paymentId = this.route.snapshot.queryParamMap.get('paymentId')
    // if (paymentId?.hasActualValue()) {
    //   this.processMyFatoorahPayment(paymentId)
    //   this.activeTab = 'payment'
    // }
    let payMobId = this.route.snapshot.queryParamMap.get('id')
    let payMobStatus = this.route.snapshot.queryParamMap.get('success')
    if (payMobId) {
      if (payMobStatus === 'true') {
        this.processPayMobPayment(payMobId!)
      } else {
        this.errorMessage = this.translateService.instant('PAYMENT_FAILED_MESSAGE')
      }
    }
  }

  moveToPayment(addressId: number) {
    this.selectedAddressId = addressId
    let selectedAddress = this.addresses.find((address) => address.id === addressId)
    if (selectedAddress) {
      this.loading = true
      this.addressApi.getDeliveryFees(this.selectedBranch?.id!, 0, selectedAddress!.deliveryAreaId!).subscribe({
        next: (deliveryCharge) => {
          this.loading = false
          console.log("Retrieved fees inside move to payment ", deliveryCharge)
          this.deliveryCharge = deliveryCharge
          this.activeTab = 'payment'
        },
        error: (err) => {
          this.loading = false
          console.log("Error while getting delivery fees", err)
        }
      })
    } else {
      this.deliveryCharge = 0
      this.activeTab = 'payment'
    }
  }

  applyCoupon(couponModel: CouponModel | null) {
    this.couponModel = couponModel
    if (this.couponModel) {
      if (this.couponModel.discountType === 'percent') {
        let discount = this.couponModel.discount! / 100
        this.discountAmountFromCoupon = this.totalPrice * discount
        this.totalPrice = this.totalPrice - (this.totalPrice * discount)
      } else {
        this.discountAmountFromCoupon = couponModel?.discount ?? 0
        this.totalPrice -= this.couponModel.discount!
      }
    } else {
      this.totalPrice = 0
      this.discountAmountFromCoupon = 0
      for (let cartProduct of this.cartProductItems) {
        let price = ProductPriceUtil.calculatePrice(cartProduct)
        this.totalPrice += (cartProduct.count * price)
      }
    }
  }

  placeOrder(paymentMethod: PaymentMethod) {
    this.placeOrderBody = new PlaceOrderBody(
      this.cartProductItems,
      this.couponModel !== null ? this.discountAmountFromCoupon : 0,
      this.couponModel?.title ?? '',
      this.couponModel?.code ?? '',
      +this.totalPrice + +this.deliveryCharge,
      this.selectedAddressId,
      this.configModel?.selfPickup === true ? 'take_away' : 'delivery',
      paymentMethod.getWay ?? '',
      this.selectedBranch?.id ?? 1,
      'now',
      this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
      '',
      0,
      '0',
      null,
      null,
      null
    )
    if (paymentMethod.getWay === 'cash_on_pick_up' || paymentMethod.getWay === 'cash_on_delivery') {
      this.callPlaceOrder()
    } else if (paymentMethod.getWay === 'pay_mob') {
      this.startPayMob()
    } else {
      this.makeOnlinePayment()
    }
  }

  private reloadUserAddresses() {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.addresses = addresses
      },
      error: (err) => {
        this.loading = false
        console.log("Failed to reload addresses", err)
      }
    })
  }

  private callPlaceOrder() {
    this.placingOrder = true
    this.errorMessage = null
    this.ordersApi.placeOrder(this.placeOrderBody!).subscribe({
      next: (orderNumber) => {
        this.placingOrder = false
        this.activeTab = 'confirm'
        this.toastService.showToast('normal', `Order Successful\n Order no: ${orderNumber}`)
        this.orderId = orderNumber
        this.cartProductsService.clearCart()
        this.logOrderEvent(this.placeOrderBody!, null)
        this.logProductPurchaseEvent(this.placeOrderBody!)
      },
      error: (err) => {
        this.placingOrder = false
        this.errorMessage = err
        this.logOrderEvent(this.placeOrderBody!, err)
      }
    })
  }

  private makeOnlinePayment() {

  }

  goToOrderDetails() {
    this.router.navigate(['/profile'], {state: {tab: 'orders'}}).then()
  }

  shouldHideTabs() {
    if (this.cartProductItems.isEmpty() && this.activeTab !== 'confirm') {
      return true
    }
    if (this.activeTab === 'confirm') {
      return false
    }
    return false
  }

  private logOrderEvent(placeOrder: PlaceOrderBody, errorMessage: string | null) {
    let parameters = new Map<string, any>()
    parameters.set('sum', placeOrder.orderAmount)
    parameters.set('value', placeOrder.orderAmount)
    parameters.set('currency', this.configModel?.currencySymbol)
    parameters.set('transaction_id', this.orderId)
    parameters.set('store_name', this.selectedBranch?.name)
    parameters.set('payment_type', placeOrder.paymentMethod)
    parameters.set('order_type', placeOrder.orderType)
    if (errorMessage !== null) {
      parameters.set('failed_reason', errorMessage)
    }
    this.analyticsService.logEvent({
      event: errorMessage === null ? AnalyticsEvent.placeOrder : AnalyticsEvent.placeOrderFailed,
      parameters: parameters
    })
  }

  private logProductPurchaseEvent(placeOrder: PlaceOrderBody) {
    placeOrder.cart?.forEach((cartProduct) => {
      let parameters = new Map<string, any>()
      parameters.set('item_id', cartProduct.product.id)
      parameters.set('item_name', cartProduct.product.name)
      parameters.set('item_quantity', cartProduct.count)
      parameters.set('item_value', cartProduct.product.price)
      parameters.set('item_currency', 'EGP')
      parameters.set('type', 'product')
      parameters.set('transaction_id', this.orderId)
      this.analyticsService.logEvent({
        event: AnalyticsEvent.productBought,
        parameters: parameters
      })
    })
  }

  private startPayMob() {
    this.placingOrder = true
    let user: UserInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    this.payMobApi.createPaymentIntention(this.totalPrice, user).subscribe({
      next: (clientSecret) => {
        this.placingOrder = false
        localStorage.setItem(ORDER_BODY, JSON.stringify(this.placeOrderBody))
        let paymentUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${environment.payMobPublicKey}&clientSecret=${clientSecret}`
        window.open(paymentUrl, "_self")
        // this.myFatoorahPaymentMethods = payments
        // this.openMyFatoorahElem.nativeElement.click()
      },
      error: (err) => {
        this.placingOrder = false
        console.log("Error received ", err)
      }
    })

  }

  private processPayMobPayment(paymentId: string) {
    this.placeOrderBody = JSON.parse(localStorage.getItem(ORDER_BODY)!)
    this.placeOrderBody = Object.assign(
      new PlaceOrderBody(),
      this.placeOrderBody,
      {
        transactionReference: paymentId,
        paymentMethod: 'pay_mob',
      })
    this.callPlaceOrder()
  }

}
