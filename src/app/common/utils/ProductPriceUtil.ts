import {CartProductItem} from "../../features/cart/data/model/CartProductItem";

export class ProductPriceUtil {
  static calculatePrice(cartProduct: CartProductItem): number {
    let price = cartProduct.product.priceIncludingTax!
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

  static calculatePriceWithoutTax(cartProduct: CartProductItem): number {
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

  static calculateTax(cartProduct: CartProductItem): number {
    let productPriceWithoutTax = cartProduct.product.price!
    if (cartProduct.product.taxType === "amount") {
      return cartProduct.product.tax ?? 0
    } else {
      return ((cartProduct.product.tax ?? 0) / 100) * productPriceWithoutTax
    }
  }
}
