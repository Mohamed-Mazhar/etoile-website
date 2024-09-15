import {Component, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";

@Component({
  selector: 'cart-side-page',
  templateUrl: './cart-side-page.component.html',
  styleUrls: ['./cart-side-page.component.scss']
})
export class CartSidePageComponent implements OnInit {

  cartProducts: CartProductItem[] = []

  totalPrice = 0

  constructor(
    private cartService: CartProductsService
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartProductsSubject.subscribe({
      next: (products) => {
        this.totalPrice = 0
        this.cartProducts = products
        for (let cartProduct of this.cartProducts) {
          let price = cartProduct.product.price
          let count = cartProduct.count
          this.totalPrice += price * count
        }
      }
    })
  }

}
