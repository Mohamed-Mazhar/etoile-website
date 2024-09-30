import {Injectable} from '@angular/core';
import {CartProductItem} from "../../features/cart/data/model/CartProductItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private cartProducts: CartProductItem[] = []

  public cartProductToRemove = new BehaviorSubject<CartProductItem | null>(null)

  public cartProductsSubject = new BehaviorSubject<CartProductItem[]>(this.cartProducts)

  constructor() {

  }

  public addProduct(cartProduct: CartProductItem) {
    this.cartProducts.push(cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
  }

  public removeProduct(cartProduct: CartProductItem) {
    this.cartProducts = this.cartProducts.filter(cartProductItem => cartProductItem !== cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
  }

  decreaseQuantity(cartProduct: CartProductItem) {
    if (cartProduct.count > 1) {
      let newProduct: CartProductItem = {
        product: cartProduct.product,
        count: cartProduct.count - 1
      }
      Object.assign(
        this.cartProducts.find((cartProduct) => cartProduct == cartProduct),
        newProduct
      )
      this.cartProductsSubject.next(this.cartProducts)
    }
  }

  increaseQuantity(cartProduct: CartProductItem) {
    let newProduct: CartProductItem = {
      product: cartProduct.product,
      count: cartProduct.count + 1
    }
    Object.assign(
      this.cartProducts.find((cartProduct) => cartProduct == cartProduct),
      newProduct
    )
    this.cartProductsSubject.next(this.cartProducts)
  }

}
