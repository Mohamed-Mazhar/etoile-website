import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";

@Component({
  selector: 'cart-side-item',
  templateUrl: './cart-side-item.component.html',
  styleUrls: ['./cart-side-item.component.scss']
})
export class CartSideItemComponent implements OnInit {

  @Input() cartProduct!: CartProductItem
  @Input() productIndex!: number
  @Input() hideSeparator: boolean = false
  @Input() isAvailable: boolean = true
  configModel: ConfigModel | null = null
  productDiscountPrice = 0

  constructor(
    private cartProductsService: CartProductsService,
    private configModelService: ConfigModelService
  ) {
  }

  ngOnInit(): void {
    console.log("Is product available ", this.isAvailable)
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
    this.productDiscountPrice = ProductPriceUtil.convertDiscount(
      this.cartProduct.product.priceIncludingTax,
      this.cartProduct.product.discount,
      this.cartProduct.product.discountType
    )
  }

  removeProduct(cartProduct: CartProductItem) {
    this.cartProductsService.cartProductToRemove.next(cartProduct)
  }

  decreaseProduct() {
    if (this.isAvailable) {
      this.cartProductsService.decreaseQuantity(this.cartProduct, this.productIndex)
    }
  }

  increaseProduct() {
    if (this.isAvailable) {
      this.cartProductsService.increaseQuantity(this.cartProduct, this.productIndex)
    }
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.cartProduct.product.image}`
  }

  getPrice(): number {
    return ProductPriceUtil.calculatePrice(this.cartProduct)
  }
}
