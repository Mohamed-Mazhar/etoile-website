import {Injectable} from '@angular/core';
import {CartProductItem} from "../../features/cart/data/model/CartProductItem";
import {BehaviorSubject} from "rxjs";
import {AppEventBroadcaster} from "../app-events/app-event-broadcaster";
import {AppEvent} from "../app-events/app-event";
import {Product} from "../data-classes/ProductModel";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private cartProducts: CartProductItem[] = []
  public cartProductToRemove = new BehaviorSubject<CartProductItem | null>(null)
  public cartProductsSubject = new BehaviorSubject<CartProductItem[]>(this.cartProducts)
  public productToEditSubject = new BehaviorSubject<Product | null>(null)

  constructor(
    private toastService: ToastService
  ) {

  }

  public addProduct(cartProduct: CartProductItem) {
    let existingProductIndex = this.cartProducts.findIndex((cart) => cart.product.id === cartProduct.product.id)
    if (existingProductIndex !== -1) {
      let existingAddons = JSON.stringify(this.cartProducts[existingProductIndex].productAddOns)
      let newProductAddons = JSON.stringify(cartProduct.productAddOns)
      let existingVariations = JSON.stringify(this.cartProducts[existingProductIndex].variations)
      let newVariations = JSON.stringify(cartProduct.variations)
      if (existingAddons === newProductAddons && existingVariations === newVariations) {
        this.increaseQuantity(cartProduct, existingProductIndex)
      } else {
        this.addNewProduct(cartProduct)
      }
    } else {
      this.addNewProduct(cartProduct)
    }
    this.toastService.showToast('normal', 'Product Added')
  }

  private addNewProduct(cartProduct: CartProductItem) {
    this.cartProducts.push(cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
  }

  public removeProduct(cartProduct: CartProductItem) {
    this.cartProducts = this.cartProducts.filter(cartProductItem => cartProductItem !== cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
  }

  decreaseQuantity(cartProduct: CartProductItem, productIndex: number) {
    if (this.cartProducts[productIndex].count > 1) {
      this.cartProducts[productIndex] = {
        product: cartProduct.product,
        count: this.cartProducts[productIndex].count - 1,
        productAddOns: cartProduct.productAddOns,
        variations: cartProduct.variations
      }
      this.cartProductsSubject.next(this.cartProducts)
    } else {
      this.cartProductToRemove.next(cartProduct)
      AppEventBroadcaster.publish({event: AppEvent.showRemoveProductAlert})
    }
  }

  increaseQuantity(cartProduct: CartProductItem, productIndex: number) {
    this.cartProducts[productIndex] = {
      product: cartProduct.product,
      count: this.cartProducts[productIndex].count + 1,
      productAddOns: cartProduct.productAddOns,
      variations: cartProduct.variations,
    }
    this.cartProductsSubject.next(this.cartProducts)
  }

  clearCart() {
    this.cartProducts = []
    this.cartProductsSubject.next(this.cartProducts)
  }

  editProduct(product: Product) {
    this.productToEditSubject.next(product)
  }

}
