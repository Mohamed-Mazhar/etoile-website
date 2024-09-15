import {Injectable} from '@angular/core';
import {CartProductItem} from "../../features/cart/data/model/CartProductItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private cartProducts: CartProductItem[] =  [
    {
      product: {
        id: "212",
        price: 1200,
        name: "Permuda Lotus",
        description: "Made from exquisite butter Made from exquisite butter Made from exquisite butter",
        image: "https://linktsp.blob.core.windows.net/xretoile/8cb85044-eb69-4e60-9ef4-79984e5ab207-638072362885885943.png"
      },
      count: 2
    },
    {
      product: {
        id: "215",
        price: 200,
        name: "Super Gateau Lux",
        description: "Exquisite piece of Gateau",
        image: "https://linktsp.blob.core.windows.net/xretoile/8d9af2a8-fe84-4e20-85f8-f1260b72fd47-638081804942872463.png"
      },
      count: 4
    },
    {
      product: {
        id: "215",
        price: 200,
        name: "Super Gateau Lux",
        description: "Exquisite piece of Gateau",
        image: "https://linktsp.blob.core.windows.net/xretoile/8d9af2a8-fe84-4e20-85f8-f1260b72fd47-638081804942872463.png"
      },
      count: 4
    },
    {
      product: {
        id: "215",
        price: 200,
        name: "Super Gateau Lux",
        description: "Exquisite piece of Gateau",
        image: "https://linktsp.blob.core.windows.net/xretoile/8d9af2a8-fe84-4e20-85f8-f1260b72fd47-638081804942872463.png"
      },
      count: 4
    }
  ]
  public cartProductToRemove = new BehaviorSubject<CartProductItem | null>(null)

  public cartProductsSubject = new BehaviorSubject<CartProductItem[]>(this.cartProducts)

  constructor() {
  }

  public addProduct(cartProduct: CartProductItem) {
    this.cartProducts.push(cartProduct)
  }

  public removeProduct(cartProduct: CartProductItem) {
    this.cartProducts = this.cartProducts.filter(cartProductItem => cartProductItem !== cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
  }
}
