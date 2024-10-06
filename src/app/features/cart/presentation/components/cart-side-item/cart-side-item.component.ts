import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";

@Component({
  selector: 'cart-side-item',
  templateUrl: './cart-side-item.component.html',
  styleUrls: ['./cart-side-item.component.scss']
})
export class CartSideItemComponent implements OnInit {

  @Input() cartProduct!: CartProductItem
  @Input() productIndex!: number
  configModel: ConfigModel | null = null

  constructor(
    private cartProductsService: CartProductsService,
    private configModelService: ConfigModelService
  ) {
  }

  ngOnInit(): void {
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
  }

  removeProduct(cartProduct: CartProductItem) {
    this.cartProductsService.cartProductToRemove.next(cartProduct)
  }

  decreaseProduct() {
    this.cartProductsService.decreaseQuantity(this.cartProduct, this.productIndex)
  }

  increaseProduct() {
    this.cartProductsService.increaseQuantity(this.cartProduct, this.productIndex)
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.cartProduct.product.image}`
  }

}
