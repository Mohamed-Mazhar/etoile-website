import {Injectable} from '@angular/core';
import {
  CartProductItem,
  cartProductItemToJson,
  convertCartProductsToJson
} from "../../features/cart/data/model/CartProductItem";
import {BehaviorSubject} from "rxjs";
import {AppEventBroadcaster} from "../app-events/app-event-broadcaster";
import {AppEvent} from "../app-events/app-event";
import {Product} from "../data-classes/ProductModel";
import {ToastService} from "./toast.service";
import {CART, USER_INFO} from "../utils/constants";
import {AnalyticsService} from "../../features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../features/analytics/data/models/AnalyticsEvent";
import {ProductPriceUtil} from "../utils/ProductPriceUtil";
import {AdjustEvent} from "../../features/analytics/data/models/AdjustEvent";
import {ConfigModel} from "../data-classes/ConfigModel";
import {ConfigModelService} from "./config-model.service";
import {TranslateService} from "@ngx-translate/core";

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
    private configModelService: ConfigModelService,
    private translateService: TranslateService,
  ) {
    let existingCart = localStorage.getItem(CART)
    if (existingCart !== null) {
      this.cartProducts = JSON.parse(existingCart)
      this.cartProductsSubject.next(this.cartProducts)
    }

    this.configModelService.configModelSubject.subscribe({
      next:(configModel) => {
        this.configModel = configModel
      }
    })
  }

  public addProduct(cartProduct: CartProductItem): boolean {
    // Check stock availability first
    if (!this.checkStockAvailability(cartProduct.product, cartProduct.count)) {
      this.toastService.showToast('normal', 'Insufficient stock available')
      return false
    }

    let existingProductIndex = this.cartProducts.findIndex((cart) => cart.product.id === cartProduct.product.id)

    if (existingProductIndex !== -1) {
      let existingAddons = JSON.stringify(this.cartProducts[existingProductIndex].productAddOns)
      let newProductAddons = JSON.stringify(cartProduct.productAddOns)
      let existingVariations = JSON.stringify(this.cartProducts[existingProductIndex].variations)
      let newVariations = JSON.stringify(cartProduct.variations)

      if (existingAddons === newProductAddons && existingVariations === newVariations) {
        return this.increaseQuantity(cartProduct, existingProductIndex, cartProduct.count)
      } else {
        return this.addNewProduct(cartProduct)
      }
    } else {
      return this.addNewProduct(cartProduct)
    }
  }

  private addNewProduct(cartProduct: CartProductItem): boolean {
    this.cartProducts.push(cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    this.logAnalytics(cartProduct)
    this.toastService.showToast('normal', 'Product Added')
    return true
  }

  increaseQuantity(cartProduct: CartProductItem, productIndex: number, increaseBy: number = 1): boolean {
    const currentQuantityInCart = this.getCurrentQuantityInCart(cartProduct.product.id)
    const newTotalQuantity = currentQuantityInCart + increaseBy

    // Check if the new total quantity exceeds available stock
    if (!this.checkStockAvailability(cartProduct.product, newTotalQuantity)) {
      const availableStock = this.getAvailableStock(cartProduct.product)
      const maxCanAdd = availableStock - currentQuantityInCart

      if (maxCanAdd > 0) {
        this.toastService.showToast('warning', `Only ${maxCanAdd} items available. Added maximum possible quantity.`)
        this.increaseCart(cartProduct, productIndex, maxCanAdd)
        return true
      } else {
        this.toastService.showToast('warning', 'Product exceeded stock amount')
        return false
      }
    }

    this.increaseCart(cartProduct, productIndex, increaseBy)
    return true
  }

  private increaseCart(cartProduct: CartProductItem, productIndex: number, increaseBy: number) {
    this.cartProducts[productIndex] = {
      product: cartProduct.product,
      count: this.cartProducts[productIndex].count + increaseBy,
      productAddOns: cartProduct.productAddOns,
      variations: cartProduct.variations,
    }
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    this.logAnalytics(cartProduct)
  }

  public removeProduct(cartProduct: CartProductItem) {
    this.cartProducts = this.cartProducts.filter(cartProductItem => cartProductItem !== cartProduct)
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.setItem(CART, JSON.stringify(this.cartProducts))
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    let parameters = new Map<string, any>()
    if (userInfo) {
      parameters.set('user_id', userInfo.id)
      parameters.set('cart', this.cartProducts.map((item) => cartProductItemToJson(item)))
    }
    this.analyticsService.logEvent({
      event: AnalyticsEvent.removeProduct,
      parameters: parameters
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

  clearCart() {
    this.cartProducts = []
    this.cartProductsSubject.next(this.cartProducts)
    localStorage.removeItem(CART)
  }

  editProduct(product: Product) {
    this.productToEditSubject.next(product)
  }

  // Helper method to check stock availability
  private checkStockAvailability(product: Product, requestedQuantity: number): boolean {
    if (product.branchProduct?.stockType === "unlimited") {
      return true
    }

    const availableStock = this.getAvailableStock(product)
    return requestedQuantity <= availableStock
  }

  // Helper method to get available stock considering current cart contents
  private getAvailableStock(product: Product): number {
    if (product.branchProduct?.stockType === "unlimited") {
      return Number.MAX_SAFE_INTEGER
    }

    return product.branchProduct?.stock || 0
  }

  // Helper method to get current quantity of a product in cart
  private getCurrentQuantityInCart(productId: number | undefined): number {
    return this.cartProducts
      .filter(item => item.product.id === productId)
      .reduce((total, item) => total + item.count, 0)
  }

  // Public method to check if a product can be added to cart
  public canAddToCart(product: Product, quantity: number = 1): boolean {
    return this.checkStockAvailability(product, quantity)
  }

  // Public method to get maximum quantity that can be added for a product
  public getMaxAddableQuantity(product: Product): number {
    if (product.branchProduct?.stockType === "unlimited") {
      return Number.MAX_SAFE_INTEGER
    }

    const currentInCart = this.getCurrentQuantityInCart(product.id)
    const availableStock = this.getAvailableStock(product)
    return Math.max(0, availableStock - currentInCart)
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
