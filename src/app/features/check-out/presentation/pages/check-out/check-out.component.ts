import {Component, OnInit} from '@angular/core';
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Branch, ConfigModel, PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {PlaceOrderBody} from "../../../../../common/data-classes/PlaceOrderBody";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {SELECTED_BRANCH} from "../../../../../common/utils/constants";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {ToastService} from "../../../../../common/services/toast.service";
import {DatePipe} from '@angular/common';
import {Router} from "@angular/router";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {ConfigModelService} from "../../../../../common/services/config-model.service";


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [DatePipe]
})
export class CheckOutComponent implements OnInit {

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
  configModel : ConfigModel | null = null

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private router: Router,
    private analyticsService: AnalyticsService,
    private configModelService: ConfigModelService,
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
  }

  moveToPayment(addressId: number) {
    this.selectedAddressId = addressId
    this.activeTab = 'payment'
  }

  applyCoupon(couponModel: CouponModel | null) {
    this.couponModel = couponModel
    if (couponModel != null) {

    }
  }

  placeOrder(paymentMethod: PaymentMethod) {
    let placeOrder = new PlaceOrderBody(
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
      this.callPlaceOrder(placeOrder)
    } else {
      this.makeOnlinePayment(placeOrder)
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

  private callPlaceOrder(placeOrder: PlaceOrderBody) {
    this.placingOrder = true
    this.errorMessage = null
    this.ordersApi.placeOrder(placeOrder).subscribe({
      next: (orderNumber) => {
        this.placingOrder = false
        this.activeTab = 'confirm'
        this.toastService.showToast('normal', `Order Successful\n Order no: ${orderNumber}`)
        this.orderId = orderNumber
        this.cartProductsService.clearCart()
        this.logOrderEvent(placeOrder, null)
        this.logProductPurchaseEvent(placeOrder)
      },
      error: (err) => {
        this.placingOrder = false
        this.errorMessage = err
        this.logOrderEvent(placeOrder, err)
      }
    })
  }

  private makeOnlinePayment(placeOrder: PlaceOrderBody) {

  }

  goToOrderDetails() {
    this.router.navigate(['/profile'], { state: { tab: 'orders' } }).then()
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
    parameters.set('currency', 'EGP')
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
}
