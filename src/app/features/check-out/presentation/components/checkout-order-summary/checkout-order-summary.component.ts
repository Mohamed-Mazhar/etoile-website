import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {CouponApi} from "../../../../../common/apis/coupon-api";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {TranslateService} from "@ngx-translate/core";
import {AdjustEvent} from "../../../../analytics/data/models/AdjustEvent";

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  styleUrls: ['./checkout-order-summary.component.scss']
})
export class CheckoutOrderSummaryComponent implements OnInit {

  @Input() showExtraDetails: boolean = false
  @Output() onCouponAppliedSuccessfully: EventEmitter<CouponModel | null> = new EventEmitter<CouponModel | null>()

  products: CartProductItem[] = []
  numberOfItems: number = 0
  totalPrice: number = 0
  configModel: ConfigModel | null = null
  loading = false
  coupon = ""
  couponModel: CouponModel | null = null
  errorMessage = ""
  deliveryCharge = 0
  showRemoveCoupon = false

  constructor(
    private configModelService: ConfigModelService,
    private cartService: CartProductsService,
    private couponApi: CouponApi,
    private analyticsService: AnalyticsService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
        this.deliveryCharge = config?.deliveryCharge ?? 0
      }
    })
    this.cartService.cartProductsSubject.subscribe({
      next: (cartProducts) => {
        this.products = cartProducts
        this.calculateTotalPrice()
        this.applyCouponDiscount()
      }
    })
  }

  private calculateTotalPrice() {
    this.numberOfItems = 0
    this.totalPrice = 0
    for (let cartProduct of this.products) {
      this.numberOfItems += cartProduct.count
      let productPrice = ProductPriceUtil.calculatePrice(cartProduct)
      this.totalPrice += (cartProduct.count * productPrice)
    }
  }

  private applyCouponDiscount() {
    this.calculateTotalPrice()
    if (this.couponModel) {
      if (this.couponModel.discountType === 'percent') {
        this.totalPrice = this.totalPrice - (this.totalPrice * this.couponModel.discount!)
      } else {
        this.totalPrice -= this.couponModel.discount!
      }
    } else {
      this.calculateTotalPrice()
    }
  }


  getImage(image: string) {
    return `${this.configModel?.baseUrls?.productImageUrl}/${image}`
  }

  applyCoupon() {
    this.loading = true
    this.errorMessage = ""
    this.couponApi.applyCoupon(this.coupon).subscribe({
      next: (coupon) => {
        this.loading = false
        this.showRemoveCoupon = true
        this.couponModel = coupon
        this.onCouponAppliedSuccessfully.emit(coupon)
        this.applyCouponDiscount()
        this.analyticsService.logEvent({
          event: AnalyticsEvent.coupon,
          parameters: new Map<string, any>([
            ['id', coupon.id],
            ['code', coupon.code],
            ['type', coupon.discountType]
          ])
        })
        this.analyticsService.logAdjustEvent({event: AdjustEvent.promoCodeAdded})
      },
      error: (err) => {
        this.showRemoveCoupon = false
        this.loading = false
        this.errorMessage = err
        this.couponModel = null
        this.onCouponAppliedSuccessfully.emit(null)
        this.applyCouponDiscount()
      }
    })
  }

  removeCoupon() {
    this.couponModel = null
    this.showRemoveCoupon = false
    this.onCouponAppliedSuccessfully.emit(null)
    this.calculateTotalPrice()
  }

  getDiscountAmount() {
    if (this.couponModel?.discountType === "percent") {
      return `-${this.couponModel.discount} %`
    } else {
      return `-${this.couponModel?.discount} ${this.configModel?.currencySymbol}`
    }
  }

}
