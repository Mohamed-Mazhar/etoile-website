import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Branch, ConfigModel, PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {PlaceOrderBody} from "../../../../../common/data-classes/PlaceOrderBody";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {ORDER_BODY, SELECTED_BRANCH} from "../../../../../common/utils/constants";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {ToastService} from "../../../../../common/services/toast.service";
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {MyFatoorahApi} from "../../../../../common/apis/my-fatoorah-api";
import {MyFatoorahPaymentMethod} from "../../../../../common/data-classes/MyFatoorahPaymentMethod";
import {TranslateService} from "@ngx-translate/core";


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

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private router: Router,
    private analyticsService: AnalyticsService,
    private configModelService: ConfigModelService,
    private myFatoorahApi: MyFatoorahApi,
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
    let paymentId = this.route.snapshot.queryParamMap.get('paymentId')
    if (paymentId?.hasActualValue()) {
      this.processMyFatoorahPayment(paymentId)
      this.activeTab = 'payment'
    }
  }

  moveToPayment(addressId: number) {
    this.selectedAddressId = addressId
    this.activeTab = 'payment'
  }

  applyCoupon(couponModel: CouponModel | null) {
    this.couponModel = couponModel
    if (this.couponModel) {
      if (this.couponModel.discountType === 'percent') {
        let discount = this.couponModel.discount! / 100
        this.totalPrice = this.totalPrice - (this.totalPrice * discount)
      } else {
        this.totalPrice -= this.couponModel.discount!
      }
    } else {
      this.totalPrice = 0
      for (let cartProduct of this.cartProductItems) {
        let price = ProductPriceUtil.calculatePrice(cartProduct)
        this.totalPrice += (cartProduct.count * price)
      }
    }
  }

  placeOrder(paymentMethod: PaymentMethod) {
    this.placeOrderBody = new PlaceOrderBody(
      this.cartProductItems,
      this.couponModel !== null ? (this.couponModel?.discount ?? 0) : 0,
      this.couponModel?.title ?? '',
      this.couponModel?.code ?? '',
      this.totalPrice,
      this.selectedAddressId,
      this.configModel?.selfPickup === true ? 'take away' : '',
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
    if (paymentMethod.getWay === 'selfPickup') {
      this.callPlaceOrder()
    } else if (paymentMethod.getWay === 'my_fatoorah') {
      console.log("Selected payment my_fattorah")
      this.startMyFatoorah()
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

  private startMyFatoorah() {
    this.placingOrder = true
    console.log("Starting my fatoorah ", this.totalPrice)
    this.myFatoorahApi.getPaymentGateWays(this.totalPrice).subscribe({
      next: (payments) => {
        this.placingOrder = false
        this.myFatoorahPaymentMethods = payments
        this.openMyFatoorahElem.nativeElement.click()
      },
      error: (err) => {
        this.placingOrder = false
        console.log("Error received ", err)
      }
    })

  }

  executeMyFatoorahTransaction(paymentMethodId: number) {
    this.placingOrder = true
    this.myFatoorahApi.executePayment(paymentMethodId, this.totalPrice).subscribe({
      next: (paymentUrl) => {
        localStorage.setItem(ORDER_BODY, JSON.stringify(this.placeOrderBody))
        this.placingOrder = false
        window.open(paymentUrl, "_self")
      }
    })
  }

  private processMyFatoorahPayment(paymentId: string) {
    this.loading = true
    this.myFatoorahApi.getPaymentStatus(paymentId).subscribe({
      next: (paymentResponse) => {
        this.loading = false
        this.placeOrderBody = JSON.parse(localStorage.getItem(ORDER_BODY)!)
        if (paymentResponse.Data.InvoiceStatus === "Paid") {
          this.placeOrderBody = Object.assign(new PlaceOrderBody(), this.placeOrderBody, {transactionReference: paymentResponse.Data.InvoiceId})
          this.callPlaceOrder()
        } else {
          this.errorMessage = this.translateService.instant('PAYMENT_FAILED_MESSAGE')
        }
      },
      error: (err) => {
        this.loading = false
        console.log("Error for payment response", err)
      }
    })
  }
}
