import {CartProductItem} from "../../features/cart/data/model/CartProductItem";
import {Product} from "../data-classes/ProductModel";

export class ProductPriceUtil {
  static calculatePrice(cartProduct: CartProductItem): number {
    let price = this.getProductPrice(cartProduct.product)
    cartProduct.productAddOns.forEach((addon) => {
      price += addon.price!
    })
    cartProduct.variations.forEach((variation) => {
      variation.values.forEach((values) => {
        if (variation.name.toLowerCase() === "size") {
          price = values.optionPrice!
        } else {
          price += values.optionPrice!
        }
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

  static getProductPrice(product: Product) : number {
    let productPrice = product.priceIncludingTax
    let indexOfVariationSize = product.branchProduct?.variations?.findIndex((variation) => {
      return variation.name?.toLowerCase() === "size"
    })
    if (indexOfVariationSize !== undefined && indexOfVariationSize !== -1) {
      let indexOfDefault = product.branchProduct?.variations![indexOfVariationSize].variationValues?.findIndex((varValue) => {
        return varValue.isDefault
      })
      productPrice = product.branchProduct?.variations![indexOfVariationSize]!.variationValues![indexOfDefault!].optionPrice!
    }
    return productPrice!
  }
}
