import { Component, OnInit } from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";

@Component({
  selector: 'app-remove-product-modal',
  templateUrl: './remove-product-modal.component.html',
  styleUrls: ['./remove-product-modal.component.scss']
})
export class RemoveProductModalComponent implements OnInit {

  cartProductItem : CartProductItem | null = null

  constructor(
    private cartProductService: CartProductsService
  ) { }

  ngOnInit(): void {
    this.cartProductService.cartProductToRemove.subscribe({
      next: (cartProduct) => {
        this.cartProductItem = cartProduct
      }
    })
  }

  removeProduct() {
    this.cartProductService.removeProduct(this.cartProductItem!)
  }

}
