import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProductPriceUtil} from "../../../../../common/utils/ProductPriceUtil";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {CartProductItem, CartProductVariations} from "../../../../cart/data/model/CartProductItem";
import {OrderDetailsModel} from "../../../../../common/data-classes/OrderDetailsModel";
import {AddOns, Variation} from "../../../../../common/data-classes/ProductModel";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent implements OnInit {

  @Input() orderDetailsModel!: OrderDetailsModel
  configModel: ConfigModel | null = null
  cartProduct: CartProductItem | null = null
  constructor(
    private configService: ConfigModelService
  ) {
  }

  ngOnInit(): void {
    this.configService.configModelSubject.subscribe({
      next: (configModel) => {
        this.configModel = configModel
      }
    })
    this.cartProduct = this.getCartProduct(this.orderDetailsModel)
  }

  getCartProduct(orderDetails: OrderDetailsModel): CartProductItem {
    return {
      product: orderDetails.productDetails!,
      count: orderDetails.quantity!,
      productAddOns: this.getProductAddons(orderDetails),
      variations: this.getVariations(orderDetails.variations ?? [])
    }
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.cartProduct?.product.image}`
  }

  getPrice(): number {
    console.log("The cart product is ", this.cartProduct)
    return this.cartProduct !== null ? ProductPriceUtil.calculatePrice(this.cartProduct) : 0
  }

  private getProductAddons(orderDetails: OrderDetailsModel): AddOns[] {
    let addons: AddOns[] = []
    let addonPrices = orderDetails.addOnPrices ?? []
    let addonIds  = orderDetails.addOnIds ?? []
    addonPrices.forEach((addon, index) => {
      addons.push(new AddOns({
        id: addonIds[index],
        price: addon
      }))
    })
    return addons
  }

  private getVariations(variations: Variation[]): CartProductVariations[] {
    let cartProductVariations: CartProductVariations[] = []
    variations.forEach((variation) => {
      cartProductVariations.push({
        name: variation.name!,
        values: variation.variationValues!
      })
    })
    return cartProductVariations
  }
}
