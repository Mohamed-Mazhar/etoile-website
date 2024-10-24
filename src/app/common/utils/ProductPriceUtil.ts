import {CartProductItem} from "../../features/cart/data/model/CartProductItem";

export class ProductPriceUtil {
  static calculatePrice(cartProduct: CartProductItem) : number {
    let price = cartProduct.product.price!
    cartProduct.productAddOns.forEach((addon) => {
      price += addon.price!
    })
    cartProduct.variations.forEach((variation) => {
      variation.values.forEach((values) => {
        price += values.optionPrice!
      })
    })
    return price
  }
}
