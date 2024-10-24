import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Product, Variation, VariationValue} from "../../../../../common/data-classes/ProductModel";
import {VariationEntity, VariationValueEntity} from "../../../data/models/VariationEntity";
import {SelectedAddonEntity} from "../../../data/models/SelectedAddonEntity";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {CartProductItem, CartProductVariations} from "../../../../cart/data/model/CartProductItem";

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
  productVariations: CartProductVariations[] = []

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

    if (isRequired && numberOfVariationsSelected <= max! && numberOfVariationsSelected >= min!) {
      this.isButtonEnabled = variationEntity.selectedVariations.some((variationEntity) => variationEntity.isSelected)
    } else {
      this.isButtonEnabled = false
    }
    this.updatePrice()
  }

  getImage() {
    return `${this.configModel?.baseUrls?.productImageUrl}/${this.product?.image}`
  }

  updateSelectedOption(variationEntity: VariationEntity, selectedIndex: number) {
    let updatedVariationIndex = this.variationEntities.findIndex((entity) => entity.variation.name === variationEntity.variation.name)
    let selectedVariation = this.variationEntities[updatedVariationIndex].selectedVariations
    let newVariationValues: VariationValueEntity[] = []
    selectedVariation.forEach((variationValue, index) => {
      newVariationValues.push({
        variation: variationValue.variation,
        isSelected: index === selectedIndex
      })
    })
    this.variationEntities[updatedVariationIndex].selectedVariations = newVariationValues
    this.updatePrice()
  }

  updatePrice() {
    this.productVariations = []
    this.productPrice = this.product?.price!
    let newPrice = 0
    this.variationEntities.forEach((variationEntity) => {
      let selectedValues: VariationValue[] = []
      variationEntity.selectedVariations.forEach((selectedVariation) => {
        if (selectedVariation.isSelected) {
          newPrice += selectedVariation.variation.optionPrice!
          selectedValues.push(selectedVariation.variation)
        }
      })
      if (selectedValues.isNotEmpty()) {
        this.productVariations.push({
          name: variationEntity.variation.name!,
          values: selectedValues
        })
      }
    })
    this.selectedAddons.forEach((addon) => {
      if (addon.isSelected) {
        newPrice += addon.addon.price!
      }
    })
    this.productPrice += newPrice
  }

  addToCart() {
    let cartProductItem: CartProductItem = {
      product: this.product!,
      count: 1,
      productAddOns: [...this.selectedAddons.filter((entity) => entity.isSelected).map((entity) => entity.addon)],
      variations: this.productVariations
    }
    console.log("Product added to cart ", cartProductItem)
    this.cartService.addProduct(cartProductItem)
    this.closeElem.nativeElement.click()
  }

}
