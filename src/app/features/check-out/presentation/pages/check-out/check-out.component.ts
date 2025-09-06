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
import {OnlinePaymentApi} from "../../../../../common/apis/online-payment-api";
import {TranslateService} from "@ngx-translate/core";
import {SplashApi} from "../../../../../common/apis/splash-api";
import {DiscountAvailabilityModel} from "../../../../../common/data-classes/DiscountAvailabilityModel";


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [DatePipe]
})
export class CheckOutComponent implements OnInit {

  @ViewChild('openMyFatoorahElem') openMyFatoorahElem!: ElementRef
  @ViewChild('discountAvailElem') discountAvailElem!: ElementRef
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
  placeOrderBody: PlaceOrderBody | null = null
  discountAmountFromCoupon: number = 0
  deliveryCharge: number = 0
  totalDiscount = 0
  discountAvailabilityModel: DiscountAvailabilityModel | null = null
  selectedAddress: AddressModel | null = null


  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private router: Router,
    private analyticsService: AnalyticsService,
    private configModelService: ConfigModelService,
    private onlinePaymentApi: OnlinePaymentApi,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private splashApi: SplashApi,
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.addresses = []
    let currentBranch: Branch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        addresses.forEach((address) => {
          if (address.branchId === currentBranch.id) {
            this.addresses.push(address)
          }
        })
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
          let price = ProductPriceUtil.convertDiscount(
            ProductPriceUtil.calculatePrice(cartProduct),
            cartProduct.product.discount,
            cartProduct.product.discountType,
          )
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
        this.processOnlinePayment(payMobId!, 'pay_mob')
      } else {
        this.errorMessage = this.translateService.instant('PAYMENT_FAILED_MESSAGE')
      }
    }
    let geideaOrderId = this.route.snapshot.queryParamMap.get('orderId')
    let paymentStatus = this.route.snapshot.queryParamMap.get('responseMessage')
    let responseCode = this.route.snapshot.queryParamMap.get('responseCode')
    if (geideaOrderId?.hasActualValue()) {
      if (responseCode?.toString() === "000") {
        this.logOnlinePaymentResponse({
          "orderId": geideaOrderId,
          "responseCode": responseCode,
          "state": paymentStatus,
        })
        this.processOnlinePayment(geideaOrderId, 'geidea')
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
      this.selectedAddress = selectedAddress
      this.addressApi.getDeliveryFees(this.selectedBranch?.id!, 0, selectedAddress!.deliveryAreaId!).subscribe({
        next: (deliveryCharge) => {
          this.loading = false
          this.deliveryCharge = deliveryCharge
          this.activeTab = 'payment'
          this.checkDiscountAvailability()
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
        let price = ProductPriceUtil.convertDiscount(
          ProductPriceUtil.calculatePrice(cartProduct),
          cartProduct.product.discount,
          cartProduct.product.discountType,
        )
        this.totalPrice += (cartProduct.count * price)
      }
    }
    this.checkDiscountAvailability()
  }

  checkDiscountAvailability() {
    this.loading = true
    this.splashApi.checkDiscountAvailability(
      this.cartProductItems,
      +this.totalPrice + +this.deliveryCharge,
      this.totalDiscount,
      this.couponModel?.discount ?? 0
    ).subscribe({
      next: (discountAvailabilityModel) => {
        this.loading = false
        if (discountAvailabilityModel?.status == null || discountAvailabilityModel?.status != "no_discount") {
          if (this.discountAvailabilityModel?.discountId !== discountAvailabilityModel.discountId) {
            this.discountAvailElem.nativeElement.click()
          }
        }
        this.discountAvailabilityModel = discountAvailabilityModel
        if (this.discountAvailabilityModel?.type === "free_delivery") {
          this.deliveryCharge = 0
        }
      },
      error: (err) => {
        this.loading = false
        console.log("Error received inside discount availability", err)
      }
    })
  }

  placeOrder(paymentMethod: PaymentMethod) {
    const discount = Number(this.discountAvailabilityModel?.applicableAmount) || 0;
    this.placeOrderBody = new PlaceOrderBody(
      this.cartProductItems,
      this.couponModel !== null ? this.discountAmountFromCoupon : 0,
      this.couponModel?.title ?? '',
      this.couponModel?.code ?? '',
      +this.totalPrice - discount,
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
      null,
      this.selectedAddress?.deliveryAreaId,
      this.discountAvailabilityModel?.discountId,
      this.discountAvailabilityModel?.applicableAmount
    )
    if (paymentMethod.getWay === 'cash_on_pick_up' || paymentMethod.getWay === 'cash_on_delivery') {
      this.callPlaceOrder()
    } else if (paymentMethod.getWay === 'pay_mob') {
      this.startGediaPayment()
    } else {
      this.makeOnlinePayment()
    }
  }

  private reloadUserAddresses() {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.addresses = []
        addresses.forEach((address) => {
          let currentBranch: Branch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
          if (address.branchId === currentBranch.id) {
            this.addresses.push(address)
          }
        })
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
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    let parameters = new Map<string, any>()
    parameters.set('user_data', userInfo)
    parameters.set('order_info', placeOrder.toJson())
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
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    placeOrder.cart?.forEach((cartProduct) => {
      let parameters = new Map<string, any>()
      parameters.set('user_data', userInfo)
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
  private startGediaPayment() {
    this.placingOrder = true
    this.onlinePaymentApi.initiateGeideaPayment(
      this.placeOrderBody!,
    ).subscribe({
      next: (data) => {
        console.log("Returned gedia session", data)
        this.placingOrder = false
        localStorage.setItem(ORDER_BODY, JSON.stringify(this.placeOrderBody))
        let paymentUrl = data['url']
        window.open(paymentUrl, "_self")
      },
      error: (err) => {
        this.placingOrder = false
        console.log("Returned gedia session error", err)
      }
    })
  }

  private processOnlinePayment(paymentId: string, paymentMethod: string) {
    this.placeOrderBody = JSON.parse(localStorage.getItem(ORDER_BODY)!)
    this.placeOrderBody = Object.assign(
      new PlaceOrderBody(),
      this.placeOrderBody,
      {
        transactionReference: paymentId,
        paymentMethod: paymentMethod,
      })
    this.callPlaceOrder()
  }

  private logOnlinePaymentResponse(response: { [key: string]: any }) {
    this.onlinePaymentApi.logOnlinePaymentResponse(response).subscribe()
  }

}
