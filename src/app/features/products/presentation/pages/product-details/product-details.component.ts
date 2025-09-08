import {Component, OnInit} from '@angular/core';
import {Product, VariationValue} from "../../../../../common/data-classes/ProductModel";
import {ActivatedRoute} from "@angular/router";
import {ProductsApi} from "../../../../../common/apis/products-api";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {TranslateService} from "@ngx-translate/core";
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {CartProductVariations} from "../../../../cart/data/model/CartProductItem";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {USER_INFO} from "../../../../../common/utils/constants";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null
  loading = false
  productRating = 0
  productCount = 1
  configModel: ConfigModel | null = null
  selectedSize = "Select Size"
  indexOfVariationSize = -1
  productPrice = 0
  productDiscountPrice = 0
  productImage = ""

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi,
    private cartService: CartProductsService,
    private configModelService: ConfigModelService,
    private translateService: TranslateService,
    private analyticsService: AnalyticsService
  ) {

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];
    this.loading = true
    this.productsApi.getProductDetails(productId).subscribe({
      next: (product) => {
        this.loading = false
        this.product = product
        this.productImage = this.getImage()
        this.productPrice = ProductPriceUtil.getProductPrice(product)
        this.productDiscountPrice = ProductPriceUtil.convertDiscount(
          product.priceIncludingTax, product.discount, product.discountType
        )
        this.productRating = product.rating?.reduce((pre, current) => {
            return pre + current.average!
          }, 0
        )! / product.rating?.length!
        this.setDefaultSelectedSize()
        this.logProductVisited()
      },
      error: (err) => {
        this.loading = false
        console.log("Error received in product details", err)
      }
    })
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
  }

  increaseProductCount() {
    this.productCount++
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--
    }
  }

  addToCart() {
    let variations: CartProductVariations[] = []
    if (this.showSizeVariant()) {
      let size = this.product?.branchProduct?.variations![this.indexOfVariationSize]!
      variations.push({
        name: size.name!,
        values: [
          new VariationValue({
            optionLabel: this.selectedSize,
            optionPrice: this.productPrice,
            isAvailable: true,
            isDefault: false
          })
        ]
      })
    }
    this.cartService.addProduct({
      product: this.product!,
      count: this.productCount,
      productAddOns: [],
      variations: variations
    })
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.product?.image}`
  }

  openProductAddOns() {
    this.cartService.editProduct(this.product!)
  }

  isProductAvailable() {
    return this.product?.branchProduct?.isAvailable ?? false
  }

  getText() {
    return this.product?.branchProduct?.isAvailable === true ?
      this.translateService.instant('ADD_TO_CART') : this.translateService.instant('NOT_AVAILABLE')
  }

  private setDefaultSelectedSize() {
    if (this.showSizeVariant()) {
      let indexOfVariationSize = this.product!.branchProduct?.variations?.findIndex((variation) => {
        return variation.name?.toLowerCase() === "size"
      })
      if (indexOfVariationSize !== undefined && indexOfVariationSize !== -1) {
        let indexOfDefault = this.product!.branchProduct?.variations![indexOfVariationSize].variationValues?.findIndex((varValue) => {
          return varValue.isDefault
        })
        this.selectedSize = this.product!.branchProduct?.variations![indexOfVariationSize]!.variationValues![indexOfDefault!].optionLabel!
      }
    }
  }

  setProductVariation(variationValue: VariationValue) {
    this.selectedSize = variationValue.optionLabel!
    this.productPrice = variationValue.optionPrice!
    this.productDiscountPrice = ProductPriceUtil.convertDiscount(
      this.productPrice, this.product?.discount, this.product?.discountType
    )
  }

  showSizeVariant() {
    this.indexOfVariationSize = this.product?.branchProduct?.variations?.findIndex((variation) => {
      return variation.name?.toLowerCase() === "size"
    }) ?? -1
    return this.indexOfVariationSize !== -1
  }

  setDefaultPic() {
    this.productImage = "assets/images/placeholder_image.jpg"
  }

  getStockClass(): string {
    const quantity = this.product?.branchProduct?.stock || 0;

    if (quantity > 10 || this.product?.branchProduct?.stockType === "unlimited") return 'in-stock'
    if (quantity > 0) return 'low-stock'
    return 'out-of-stock'
  }

  getStockText(): string {
    const quantity = this.product?.branchProduct?.stock || 0
    if (quantity > 10 || this.product?.branchProduct?.stockType === "unlimited") return this.translateService.instant('IN_STOCK')
    if (quantity > 0) return this.translateService.instant(
      'STOCK_QUANTITY_LEFT',
      {quantity: quantity}
    )
    return this.translateService.instant('OUT_OF_STOCK')
  }

  getDiscountPercentage(): number {
    if (this.productPrice > 0 && this.productDiscountPrice > 0 && this.productPrice !== this.productDiscountPrice) {
      return Math.round(((this.productPrice - this.productDiscountPrice) / this.productPrice) * 100);
    }
    return 0;
  }

  logProductVisited() {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    let parameters = new Map<string, any>()
    if (userInfo) {
      parameters.set('user_id', userInfo.id)
    }
    parameters.set('product_name', this.product?.name)
    parameters.set('product_id', this.product?.id)
    parameters.set('product_price', this.product?.priceIncludingTax)
    parameters.set('product_category', this.product?.categoryIds)
    this.analyticsService.logEvent({
      event: AnalyticsEvent.productPageVisited,
      parameters: parameters
    })
  }

  protected readonly ProductPriceUtil = ProductPriceUtil;
}
