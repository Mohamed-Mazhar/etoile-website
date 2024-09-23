import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";

@Component({
  selector: 'cart-side-item',
  templateUrl: './cart-side-item.component.html',
  styleUrls: ['./cart-side-item.component.scss']
})
export class CartSideItemComponent implements OnInit {

  @Input() cartProduct!: CartProductItem

  constructor(
    private cartProductsService: CartProductsService
  ) {
  }

  ngOnInit(): void {
  }

  removeProduct(cartProduct: CartProductItem) {
    this.cartProductsService.cartProductToRemove.next(cartProduct)
  }
}
