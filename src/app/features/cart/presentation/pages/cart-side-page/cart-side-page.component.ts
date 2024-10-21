import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {USER_INFO} from "../../../../../common/utils/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'cart-side-page',
  templateUrl: './cart-side-page.component.html',
  styleUrls: ['./cart-side-page.component.scss']
})
export class CartSidePageComponent implements OnInit {

  @ViewChild('loginElemRef') loginElem!: ElementRef
  cartProducts: CartProductItem[] = []

  totalPrice = 0

  constructor(
    private cartService: CartProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartProductsSubject.subscribe({
      next: (products) => {
        this.totalPrice = 0
        this.cartProducts = products
        for (let cartProduct of this.cartProducts) {
          let price = cartProduct.product.price!
          let count = cartProduct.count
          this.totalPrice += price * count
        }
      }
    })
  }

  goToCheckOut() {
    let user = localStorage.getItem(USER_INFO)
    if (user !== null) {
      this.router.navigate(['/checkout']).then()
    } else {
      this.loginElem.nativeElement.click()
    }
  }

}
