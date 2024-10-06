import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import * as url from "url";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";

@Component({
  selector: 'app-cart-product-item',
  templateUrl: './cart-product-item.component.html',
  styleUrls: ['./cart-product-item.component.scss']
})
export class CartProductItemComponent implements OnInit {

  @Input() cartProduct!: CartProductItem
  configModel: ConfigModel | null = null

  constructor(
    private configService: ConfigModelService,
    private cartProductsService: CartProductsService
  ) {
  }

  ngOnInit(): void {
    this.configService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
  }

  removeProduct(cartProduct: CartProductItem) {
    this.cartProductsService.cartProductToRemove.next(cartProduct)
  }

  getImage() : string {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.cartProduct.product.image}`
  }

}
