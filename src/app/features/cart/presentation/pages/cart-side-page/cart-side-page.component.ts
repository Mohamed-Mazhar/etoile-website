import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {USER_INFO} from "../../../../../common/utils/constants";
import {Router} from "@angular/router";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {AdjustEvent} from "../../../../analytics/data/models/AdjustEvent";
import {ProductsApi} from "../../../../../common/apis/products-api";

@Component({
  selector: 'cart-side-page',
  templateUrl: './cart-side-page.component.html',
  styleUrls: ['./cart-side-page.component.scss']
})
export class CartSidePageComponent implements OnInit {

  @ViewChild('loginElemRef') loginElem!: ElementRef
  @ViewChild('closeSideBar') closeSideBar!: ElementRef
  cartProducts: CartProductItem[] = []
  totalPrice = 0
  errorMessage = ""
  unAvailableProductsIds: number[] = []
  loading = false

  constructor(
    private cartService: CartProductsService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private productsApi: ProductsApi
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartProductsSubject.subscribe({
      next: (products) => {
        this.totalPrice = 0
        this.cartProducts = products
        for (let cartProduct of this.cartProducts) {
          let price = ProductPriceUtil.calculatePrice(cartProduct)
          let count = cartProduct.count
          this.totalPrice += price * count
        }
      }
    })
  }

  goToCheckOut() {
    this.loading = true
    this.errorMessage = ""
    this.productsApi.checkAvailability(this.cartProducts).subscribe({
      next: (_) => {
        this.closeSideBar.nativeElement.click()
        this.startCheckout()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        let message = err.error['message']
        this.unAvailableProductsIds = err.error['not_available']
        let notAvailableProducts = ""
        for (let product of this.cartProducts) {
          if (this.unAvailableProductsIds.includes(product.product.id!)) {
            notAvailableProducts = notAvailableProducts + product.product.name! + "<br>"
          }
        }
        this.errorMessage = `${message} <br> ${notAvailableProducts}`
      }
    })
  }

  startCheckout() {
    let user = localStorage.getItem(USER_INFO)
    if (user !== null) {
      this.analyticsService.logEvent({
        event: AnalyticsEvent.checkout,
        parameters: new Map<string, any>(
          [
            ['value', this.totalPrice],
            ['currency', 'EGP']
          ]
        )
      })
      this.analyticsService.logAdjustEvent({event: AdjustEvent.startCheckout})
      this.router.navigate(['/checkout']).then()
    } else {
      this.loginElem.nativeElement.click()
    }
  }

  checkAvailability(cartProduct: CartProductItem) {
    return !this.unAvailableProductsIds.includes(cartProduct.product.id!);
  }

}
