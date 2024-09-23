import { Component, OnInit } from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";

@Component({
  selector: 'app-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  styleUrls: ['./checkout-order-summary.component.scss']
})
export class CheckoutOrderSummaryComponent implements OnInit {

  numberOfItems: number = 0
  totalPrice: number = 0
  products: CartProductItem[] = []
  constructor(
    private cartProductsService: CartProductsService
  ) { }

  ngOnInit(): void {
    this.cartProductsService.cartProductsSubject.subscribe({
      next: (products) => {
        for (let cartProduct of products) {
          this.numberOfItems += cartProduct.count
          this.totalPrice += (cartProduct.count * cartProduct.product.price!)
          this.products.push(cartProduct)
        }
    }
    })
  }

}
