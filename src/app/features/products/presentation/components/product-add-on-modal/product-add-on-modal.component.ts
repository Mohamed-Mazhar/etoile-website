import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Product, Variation, VariationValue} from "../../../../../common/data-classes/ProductModel";
import {VariationEntity, VariationValueEntity} from "../../../data/models/VariationEntity";
import {SelectedAddonEntity} from "../../../data/models/SelectedAddonEntity";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-product-add-on-modal',
  templateUrl: './product-add-on-modal.component.html',
  styleUrls: ['./product-add-on-modal.component.scss']
})
export class ProductAddOnModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  product: Product | null = null
  variationEntities: VariationEntity[] = []
  selectedAddons: SelectedAddonEntity[] = []
  isButtonEnabled = true
  configModel: ConfigModel | null = null
  productPrice: number = 0

  constructor(
    private cartService: CartProductsService,
    private configModelService: ConfigModelService
  ) {
  }

  ngOnInit(): void {
    this.cartService.productToEditSubject.subscribe({
      next: (product) => {
        this.variationEntities = []
        this.selectedAddons = []
        this.product = product
        this.productPrice = product?.price ?? 0
        this.product?.variations?.forEach((variation) => {
          this.variationEntities.push({
            variation: variation,
            selectedVariations: this.getVariationValues(variation.variationValues!)
          })
          if (variation.isRequired) {
            this.isButtonEnabled = false
          }
        })
        this.product?.addOns?.forEach((addon) => {
          this.selectedAddons.push({
            addon: addon,
            isSelected: false
          })
        })
      }
    })
    this.configModelService.configModelSubject.subscribe({
      next: (configModel) => {
        this.configModel = configModel
      }
    })
  }

  private getVariationValues(variationValues: VariationValue[]) {
    let selectedVariations: VariationValueEntity[] = []
    variationValues.forEach((variationValue) => {
      selectedVariations.push({
        variation: variationValue,
        isSelected: false
      })
    })
    return selectedVariations
  }

  hasAddOns() {
    return this.selectedAddons.isNotEmpty()
  }

  hasLimit(variation: Variation) {
    return variation.max! > 0
  }

  adjustViews(variationEntity: VariationEntity) {
    let max = variationEntity.variation.max
    let min = variationEntity.variation.min
    let isRequired = variationEntity.variation.isRequired
    let numberOfVariationsSelected = variationEntity.selectedVariations.filter((variationEntity) => variationEntity.isSelected).length

    if (isRequired && numberOfVariationsSelected <= max! ) {
      this.isButtonEnabled = variationEntity.selectedVariations.some((variationEntity) => variationEntity.isSelected)
    } else {
      this.isButtonEnabled = false
    }
  }

  updatePrice() {
    let newPrice = 0
    this.variationEntities.forEach((variationEntity) => {
      variationEntity.selectedVariations.forEach((selectedVariation) => {
        if (selectedVariation.isSelected) {
          newPrice += selectedVariation.variation.optionPrice!
        }
      })
    })
    this.selectedAddons.forEach((addon) => {
      if (addon.isSelected) {
        newPrice += addon.addon.price!
      }
    })
    this.productPrice += newPrice
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.product?.image}`
  }

}
