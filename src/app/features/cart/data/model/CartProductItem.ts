import { AddOns, Product, VariationValue } from "../../../../common/data-classes/ProductModel";
import { ProductPriceUtil } from "../../../../common/utils/ProductPriceUtil";

export interface CartProductItem {
  product: Product;
  count: number;
  productAddOns: AddOns[];
  variations: CartProductVariations[];
}

export interface CartProductVariations {
  name: string;
  values: VariationValue[];
}

// ✅ Helper to convert a single CartProductItem to JSON
export function cartProductItemToJson(cartItem: CartProductItem): { [key: string]: any } {
  return {
    product_id: cartItem.product.id,
    price: ProductPriceUtil.calculatePrice(cartItem),
    discount_amount: 0,
    quantity: cartItem.count,
    tax_amount: ProductPriceUtil.calculateTax(cartItem),
    variant: [],
    variations: cartItem.variations.length > 0
      ? cartItem.variations.map((variation) => ({
        name: variation.name,
        values: variation.values.map((variationValue) => ({
          label: variationValue.optionLabel
        }))
      }))
      : [],
    add_on_ids: cartItem.productAddOns.map(addOn => addOn.id),
  };
}

// ✅ Wrapper for array of CartProductItem
export function convertCartProductsToJson(cartProducts: CartProductItem[]): { [key: string]: any } {
  return {
    cart: cartProducts.map(cartProductItemToJson)
  };
}
