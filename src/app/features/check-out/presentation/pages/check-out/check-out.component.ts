import {Component, OnInit} from '@angular/core';
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Branch, PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {PlaceOrderBody} from "../../../../../common/data-classes/PlaceOrderBody";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {SELECTED_BRANCH} from "../../../../../common/utils/constants";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {ToastService} from "../../../../../common/services/toast.service";
import { DatePipe } from '@angular/common';


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

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private datePipe: DatePipe
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
        console.log("Check out notified for removed product")
        this.cartProductItems = cartProducts
        for (let cartProduct of cartProducts) {
          this.totalPrice += (cartProduct.count * cartProduct.product.price!)
        }
      }
    })
  }

  moveToPayment(addressId: number) {
    this.selectedAddressId = addressId
    this.activeTab = 'payment'
  }

  applyCoupon(couponModel: CouponModel | null) {
    this.couponModel = couponModel
  }

  placeOrder(paymentMethod: PaymentMethod) {
    let placeOrder = new PlaceOrderBody(
      this.cartProductItems,
      this.couponModel !== null ? (this.couponModel?.discount ?? 0) : 0,
      this.couponModel?.title ?? '',
      this.couponModel?.code ?? '',
      this.totalPrice,
      this.selectedAddressId,
      'delivery',
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
    if (paymentMethod.getWay === 'CashOnDelivery') {
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
        this.toastService.showToast('normal', `Order Successful\n Order no: ${orderNumber}`)
        this.orderId = orderNumber
        this.activeTab = 'confirm'
      },
      error: (err) => {
        this.placingOrder = false
        this.errorMessage = err
      }
    })
  }

  private makeOnlinePayment(placeOrder: PlaceOrderBody) {

  }
}
