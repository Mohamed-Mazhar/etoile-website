import {Injectable} from '@angular/core';
import {CartProductItem} from "../../features/cart/data/model/CartProductItem";
import {BehaviorSubject} from "rxjs";
import {AppEventBroadcaster} from "../app-events/app-event-broadcaster";
import {AppEvent} from "../app-events/app-event";
import {Product} from "../data-classes/ProductModel";
import {ToastService} from "./toast.service";
import {CART} from "../utils/constants";
import {AnalyticsService} from "../../features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../features/analytics/data/models/AnalyticsEvent";
import {ProductPriceUtil} from "../utils/ProductPriceUtil";
import {AdjustEvent} from "../../features/analytics/data/models/AdjustEvent";
import {ConfigModel} from "../data-classes/ConfigModel";
import {ConfigModelService} from "./config-model.service";

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  private cartProducts: CartProductItem[] = []
  public cartProductToRemove = new BehaviorSubject<CartProductItem | null>(null)
  public cartProductsSubject = new BehaviorSubject<CartProductItem[]>(this.cartProducts)
  public productToEditSubject = new BehaviorSubject<Product | null>(null)
  configModel: ConfigModel | null = null
  constructor(
    private toastService: ToastService,
    private analyticsService: AnalyticsService,
    private configModelService: ConfigModelService
  ) {
    let existingCart = localStorage.getItem(CART)
    if (existingCart !== null) {
      this.cartProducts = JSON.parse(existingCart)
      this.cartProductsSubject.next(this.cartProducts)
    }
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
    this.configModelService.configModelSubject.subscribe({
      next:(configModel) => {
        this.configModel = configModel
      }
    })
  }

  private addNewProduct(cartProduct: CartProductItem) {
    this.cartProducts.push(cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    this.logAnalytics(cartProduct)
  }

  public removeProduct(cartProduct: CartProductItem) {
    this.cartProducts = this.cartProducts.filter(cartProductItem => cartProductItem !== cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    this.analyticsService.logEvent({
      event: AnalyticsEvent.removeProduct,
      parameters: new Map<string, any>([
        ['item_id', cartProduct.product.id]
      ])
    })
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
      localStorage.setItem(CART, JSON.stringify(this.cartProducts))
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
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    this.logAnalytics(cartProduct)
  }

  clearCart() {
    this.cartProducts = []
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.removeItem(CART)
  }

  editProduct(product: Product) {
    this.productToEditSubject.next(product)
  }

  private logAnalytics(cartProduct: CartProductItem) {
    this.analyticsService.logEvent({
      event: AnalyticsEvent.addToCart,
      parameters: new Map<string, any>([
        ['item_id', cartProduct.product.id],
        ['item_name', cartProduct.product.name],
        ['quantity', cartProduct.count],
        ['price', cartProduct.product.priceIncludingTax],
        ['value', ProductPriceUtil.calculatePrice(cartProduct)],
        ['currency', this.configModel?.currencySymbol],
        ['type', 'product'],
        ['modificator_ids', cartProduct.variations.map((variation) => variation.values)],
      ])
    })
    this.analyticsService.logAdjustEvent({event: AdjustEvent.addToCart})
  }

}
