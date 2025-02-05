import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../../../common/data-classes/ProductModel";
import {CartProductsService} from "../../../../../../common/services/cart-products.service";
import {Router} from "@angular/router";
import {ConfigModelService} from "../../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../../common/data-classes/ConfigModel";
import {AdjustEvent} from "../../../../../analytics/data/models/AdjustEvent";
import {AnalyticsService} from "../../../../../analytics/data/services/analytics-service";
import {ProductPriceUtil} from "../../../../../../common/utils/ProductPriceUtil";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit {

  @Input() product!: Product
  configModel: ConfigModel | null = null
  productPrice = 0
  productImage = ""
  productDiscountPrice = 0

  constructor(
    private cartService: CartProductsService,
    private configModelService: ConfigModelService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {
  }

  ngAfterViewInit(): void {
    this.productImage = this.getImage(this.product.image!)
  }

  ngOnInit(): void {
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

}
