import {AddOns, Product, VariationValue} from "../../../../common/data-classes/ProductModel";

export interface CartProductItem {
  product: Product,
  count: number,
  productAddOns: AddOns[],
  variations: CartProductVariations[]
}

export interface CartProductVariations {
  name: string,
  values: VariationValue[]
}
