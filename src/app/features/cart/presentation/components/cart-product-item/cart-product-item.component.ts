import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import * as url from "url";

@Component({
  selector: 'app-cart-product-item',
  templateUrl: './cart-product-item.component.html',
  styleUrls: ['./cart-product-item.component.scss']
})
export class CartProductItemComponent implements OnInit {

  @Input() cartProduct!: CartProductItem

  constructor(
    private cartProductsService: CartProductsService
  ) {
  }

  ngOnInit(): void {
  }

  removeProduct(cartProduct: CartProductItem) {
    this.cartProductsService.cartProductToRemove.next(cartProduct)
    console.log("Removed product", cartProduct)
  }

  getImage() : string {
    return `url("${this.cartProduct.product.image}")`
  }

}
