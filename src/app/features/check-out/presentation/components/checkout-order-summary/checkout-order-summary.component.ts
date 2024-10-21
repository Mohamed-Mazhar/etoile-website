import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {CouponApi} from "../../../../../common/apis/coupon-api";
import {CouponModel} from "../../../../../common/data-classes/CouponModel";

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  styleUrls: ['./checkout-order-summary.component.scss']
})
export class CheckoutOrderSummaryComponent implements OnInit {

  @Input() showExtraDetails: boolean = false
  @Input() products: CartProductItem[] = []
  @Output() onCouponAppliedSuccessfully: EventEmitter<CouponModel | null> = new EventEmitter<CouponModel | null>()

  numberOfItems: number = 0
  totalPrice: number = 0
  configModel: ConfigModel | null = null
  loading = false
  coupon = ""
  couponModel: CouponModel | null = null
  errorMessage = ""
  deliveryCharge = 0

  constructor(
    private configModelService: ConfigModelService,
    private couponApi: CouponApi
  ) {
  }

  ngOnInit(): void {
    for (let cartProduct of this.products) {
      this.numberOfItems += cartProduct.count
      this.totalPrice += (cartProduct.count * cartProduct.product.price!)
    }
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
        this.deliveryCharge = config?.deliveryCharge ?? 0
      }
    })
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
        this.couponModel = coupon
        this.onCouponAppliedSuccessfully.emit(coupon)
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err
        this.onCouponAppliedSuccessfully.emit(null)
      }
    })
  }

}
