import { Component, OnInit } from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../data/model/CartProductItem";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartItems: CartProductItem[] = []

  constructor(
    private cartProductService: CartProductsService
  ) { }

  ngOnInit(): void {
    this.cartProductService.cartProductsSubject.subscribe( {
      next: (cartProducts) => {
        this.cartItems = cartProducts
      }
    })
  }

}
