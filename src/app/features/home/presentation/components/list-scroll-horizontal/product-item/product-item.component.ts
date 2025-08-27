import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CategoryId, Product} from "../../../../../../common/data-classes/ProductModel";
import {CartProductsService} from "../../../../../../common/services/cart-products.service";
import {Router} from "@angular/router";
import {ConfigModelService} from "../../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../../common/data-classes/ConfigModel";
import {AdjustEvent} from "../../../../../analytics/data/models/AdjustEvent";
import {AnalyticsService} from "../../../../../analytics/data/services/analytics-service";
import {ProductPriceUtil} from "../../../../../../common/utils/ProductPriceUtil";
import {ProductsApi} from "../../../../../../common/apis/products-api";
import {Category} from "../../../../../../common/data-classes/Category";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements AfterViewInit {

  @Input() product!: Product
  configModel: ConfigModel | null = null
  productPrice = 0
  productImage = ""
  productDiscountPrice = 0
  isFavorite: boolean = false; // You can bind this to your data model
  productRating = 0
  categories: Category[] = []
  categoryNamesDisplay: string = '';


  constructor(
    private cartService: CartProductsService,
    private configModelService: ConfigModelService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private productsApi: ProductsApi,
    private translateService: TranslateService
  ) {
  }

  ngAfterViewInit(): void {
    this.productImage = this.getImage(this.product.image!)
    this.configModelService.categoriesSubject.subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryNamesDisplay = this.getCategory(this.product.categoryIds); // ← Save result
      }
    })
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
    this.productPrice = ProductPriceUtil.getProductPrice(this.product)
    this.productDiscountPrice = ProductPriceUtil.convertDiscount(
      this.product.priceIncludingTax,
      this.product.discount,
      this.product.discountType
    ) ?? this.productPrice

    if (this.product.rating?.length) {
      this.productRating = this.product.rating?.reduce((pre, current) => {
          return pre + (current.average ?? 0)
        }, 0
      )! / this.product.rating?.length
    }
  }

  addProduct() {
    this.cartService.addProduct({
      product: this.product,
      count: 1,
      productAddOns: [],
      variations: []
    })
  }

  goToDetails() {
    this.analyticsService.logAdjustEvent({event: AdjustEvent.productDetailsClicked})
    this.router.navigate(['/product', this.product.id]).then()
  }

  getImage(image: string) {
    return `${this.configModel?.baseUrls?.productImageUrl}/${image}`
  }

  setDefaultPic() {
    this.productImage = "assets/images/placeholder_image.jpg"
  }

  hasDiscount() {
    return this.product.branchProduct?.discount !== 0
  }

  isPercentage() {
    return this.product.branchProduct?.discountType === "percent"
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.productsApi.addToWishList(this.product.id!).subscribe()
    } else {
      this.productsApi.removeFromWishList(this.product.id!).subscribe()
    }
  }

  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(1);
  }

  getEmptyStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return Array(emptyStars).fill(1);
  }

  getStockClass(): string {
    const quantity = this.product.branchProduct?.stock || 0;

    if (quantity > 10 || this.product.branchProduct?.stockType === "unlimited") return 'in-stock'
    if (quantity > 0) return 'low-stock'
    return 'out-of-stock'
  }

  getStockText(): string {
    const quantity = this.product.branchProduct?.stock || 0
    if (quantity > 10 || this.product.branchProduct?.stockType === "unlimited") return this.translateService.instant('IN_STOCK')
    if (quantity > 0) return this.translateService.instant(
      'STOCK_QUANTITY_LEFT',
      {quantity: quantity}
    )
    return this.translateService.instant('OUT_OF_STOCK')
  }

  getCategory(categoryIds: CategoryId[] | undefined): string {
    if (!categoryIds || categoryIds.length === 0) return '';

    const categoryNames = categoryIds.map(categoryIdObj => {
      const categoryId = categoryIdObj.id?.toString();
      const topLevelCategory = this.categories.find(category => category.id?.toString() === categoryId);
      if (topLevelCategory) return topLevelCategory.name;
      for (const parentCategory of this.categories) {
        const subCategory = parentCategory.subCategories?.find(sub => sub.id?.toString() === categoryId);
        if (subCategory) return subCategory.name;
      }
      return null;
    }).filter(categoryName => !!categoryName);

    return categoryNames.join(' | ');
  }


}
