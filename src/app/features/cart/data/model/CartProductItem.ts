import {AddOns, Product, VariationValue} from "../../../../common/data-classes/ProductModel";
import {ProductPriceUtil} from "../../../../common/utils/ProductPriceUtil";

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

export function convertCartProductsToJson(cartProducts: CartProductItem[]): { [key: string]: any } {
  let jsonBody: { [key: string]: any } = {};
  jsonBody['cart'] = [];

  for (let cartItem of cartProducts) {
    jsonBody['cart'].push({
      product_id: cartItem.product.id,
      price: cartItem.product.price?.toString(),
      discount_amount: 0,
      quantity: cartItem.count,
      tax_amount: ProductPriceUtil.calculateTax(cartItem),
      variant: [],
      variations: cartItem.variations.length > 0 ? cartItem.variations.map((variation) => ({
        name: variation.name,
        values: variation.values.map((variationValue) => ({
          label: variationValue.optionLabel
        }))
      })) : [],
      add_on_ids: [],
      add_on_qtys: []
    });
  }

  return jsonBody;
}
