import {Variation, VariationValue} from "../../../../common/data-classes/ProductModel";

export interface VariationEntity {
  variation: Variation
  selectedVariations: VariationValueEntity[]
}

export interface VariationValueEntity {
  variation: VariationValue
  isSelected: boolean
}
