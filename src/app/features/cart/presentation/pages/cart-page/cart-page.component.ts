import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../data/model/CartProductItem";
import {Router} from "@angular/router";
import {USER_INFO} from "../../../../../common/utils/constants";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {ProductsApi} from "../../../../../common/apis/products-api";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  @ViewChild('login') loginElem!: ElementRef
  cartItems: CartProductItem[] = []
  price = 0
  errorMessage = ""
  unAvailableProductsIds: number[] = []
  loading = false

  constructor(
    private cartProductService: CartProductsService,
    private router: Router,
    private productsApi: ProductsApi
  ) {
  }

  ngOnInit(): void {
    this.cartProductService.cartProductsSubject.subscribe({
      next: (products) => {
        this.price = 0
        this.cartItems = products
        for (let cartProduct of this.cartItems) {
          let price = ProductPriceUtil.calculatePrice(cartProduct)
          let count = cartProduct.count
          this.price += price * count
        }
      }
    })
  }

  continue() {
    this.router.navigate(['']).then()
  }

  proceed() {
    let user = localStorage.getItem(USER_INFO)
    if (!user?.hasActualValue()) {
      this.loginElem.nativeElement.click()
    } else {
      this.router.navigate(['/checkout']).then()
    }
  }

  checkAvailability(cartProduct: CartProductItem) {
    return !this.unAvailableProductsIds.includes(cartProduct.product.id!);
  }

  checkProductsAvailability() {
    this.errorMessage = ""
    this.loading = true
    this.productsApi.checkAvailability(this.cartItems).subscribe({
      next: (_) => {
        this.loading = false
        this.proceed()
      },
      error: (err) => {
        this.loading = false
        let message = err.error['message']
        this.unAvailableProductsIds = err.error['not_available']
        let notAvailableProducts = ""
        for (let product of this.cartItems) {
          if (this.unAvailableProductsIds.includes(product.product.id!)) {
            notAvailableProducts = notAvailableProducts + product.product.name! + "<br>"
          }
        }
        this.errorMessage = `${message} <br> ${notAvailableProducts}`
      }
    })
  }

}
