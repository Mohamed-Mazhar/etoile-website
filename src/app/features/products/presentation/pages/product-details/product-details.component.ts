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
  productImage = ""

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi,
    private cartService: CartProductsService,
    private configModelService: ConfigModelService,
    private translateService: TranslateService
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
        this.productRating = product.rating?.reduce((pre, current) => {
            return pre + current.average!
          }, 0
        )! / product.rating?.length!
        this.setDefaultSelectedSize()
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
    console.log("Adding to cart with variation ", variations)
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

  protected readonly ProductPriceUtil = ProductPriceUtil;
}
