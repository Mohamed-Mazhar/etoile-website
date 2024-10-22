import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Product, Variation, VariationValue} from "../../../../../common/data-classes/ProductModel";
import {VariationEntity, VariationValueEntity} from "../../../data/models/VariationEntity";
import {SelectedAddonEntity} from "../../../data/models/SelectedAddonEntity";

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

  constructor(
    private cartService: CartProductsService
  ) {
  }

  ngOnInit(): void {
    this.cartService.productToEditSubject.subscribe({
      next: (product) => {
        this.variationEntities = []
        this.selectedAddons = []
        this.product = product
        this.product?.variations?.forEach((variation) => {
          this.variationEntities.push({
            variation: variation,
            selectedVariations: this.getVariationValues(variation.variationValues!)
          })
        })
        this.product?.addOns?.forEach((addon) => {
          this.selectedAddons.push({
            addon: addon,
            isSelected: false
          })
        })
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

  checkForLimit(variationEntity: VariationEntity) {
    let max = variationEntity.variation.max
    let min = variationEntity.variation.min
    let isRequired = variationEntity.variation.isRequired
  }
}
