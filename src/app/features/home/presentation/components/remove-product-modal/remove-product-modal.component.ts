import { Component, OnInit } from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";
import {ToastService} from "../../../../../common/services/toast.service";

@Component({
  selector: 'app-remove-product-modal',
  templateUrl: './remove-product-modal.component.html',
  styleUrls: ['./remove-product-modal.component.scss']
})
export class RemoveProductModalComponent implements OnInit {

  cartProductItem : CartProductItem | null = null

  constructor(
    private cartProductService: CartProductsService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.cartProductService.cartProductToRemove.subscribe({
      next: (cartProduct) => {
        this.cartProductItem = cartProduct
      }
    })
  }

  removeProduct() {
    this.toastService.showToast('alert', 'Product removed')
    this.cartProductService.removeProduct(this.cartProductItem!)
  }

}
