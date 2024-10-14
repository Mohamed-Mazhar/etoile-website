import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../data/model/CartProductItem";
import {Router} from "@angular/router";
import {USER_INFO} from "../../../../../common/utils/constants";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  @ViewChild('login') loginElem!: ElementRef
  cartItems: CartProductItem[] = []
  price = 0

  constructor(
    private cartProductService: CartProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartProductService.cartProductsSubject.subscribe({
      next: (cartProducts) => {
        this.cartItems = cartProducts
        this.cartItems.forEach((cart) => {
          this.price += ((cart.product.price ?? 0) * cart.count)
        })
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

}
