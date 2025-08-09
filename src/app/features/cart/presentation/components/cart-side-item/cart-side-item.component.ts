import {Component, Input, OnInit} from '@angular/core';
import {CartProductItem} from "../../../data/model/CartProductItem";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {TranslateService} from "@ngx-translate/core";

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
  productPrice: number = 0
  configModel: ConfigModel | null = null
  productDiscountPrice = 0

  constructor(
    private cartProductsService: CartProductsService,
    private configModelService: ConfigModelService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    console.log("Is product available ", this.isAvailable)
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
    this.productPrice = ProductPriceUtil.calculatePrice(this.cartProduct)
    this.productDiscountPrice = ProductPriceUtil.convertDiscount(
      this.productPrice,
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

  getStockClass(): string {
    const quantity = this.cartProduct.product.branchProduct?.stock || 0;

    if (quantity > 10 || this.cartProduct.product.branchProduct?.stockType === "unlimited") return 'in-stock'
    if (quantity > 0) return 'low-stock'
    return 'out-of-stock'
  }

  getStockText(): string {
    const quantity = this.cartProduct.product.branchProduct?.stock || 0
    if (quantity > 10 || this.cartProduct.product.branchProduct?.stockType === "unlimited") return this.translateService.instant('IN_STOCK')
    if (quantity > 0) return this.translateService.instant(
      'STOCK_QUANTITY_LEFT',
      {quantity: quantity}
    )
    return this.translateService.instant('OUT_OF_STOCK')
  }
}
