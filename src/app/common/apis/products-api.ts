import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {Product, ProductModel} from "../data-classes/ProductModel";
import {CartProductItem} from "../../features/cart/data/model/CartProductItem";

@Injectable({providedIn: 'root'})
export class ProductsApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getLatestProducts(): Observable<ProductModel> {
    let queryParameters = {
      limit: 20,
      offset: 1
    }
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.latestProducts,
      requestType: RequestType.GET,
      body: queryParameters
    }).pipe(
      map(response => {
        return ProductModel.fromJson(response)
      })
    )
  }

  getPopularProducts(): Observable<ProductModel> {
    let queryParameters = {
      limit: 20,
      offset: 1
    }
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.popularProducts,
      requestType: RequestType.GET,
      body: queryParameters
    }).pipe(
      map(response => {
        return ProductModel.fromJson(response)
      })
    )
  }

  getRecommendedProducts(): Observable<ProductModel> {
    let queryParameters = {
      limit: 20,
      offset: 1
    }
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.recommendedProducts,
      requestType: RequestType.GET,
      body: queryParameters
    }).pipe(
      map(response => {
        return ProductModel.fromJson(response)
      })
    )
  }

  getFrequentlyBoughtProducts(): Observable<ProductModel> {
    let queryParameters = {
      limit: 20,
      offset: 1
    }
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.frequentlyBought,
      requestType: RequestType.GET,
      body: queryParameters
    }).pipe(
      map(response => {
        return ProductModel.fromJson(response)
      })
    )
  }

  getProductDetails(productId: string): Observable<Product> {
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.productDetails,
      requestType: RequestType.GET,
      pathVariables: [productId]
    }).pipe(
      map(response => Product.fromJson(response))
    )
  }

  searchProducts(offset: number, filters: { [key: string]: any } | null): Observable<ProductModel> {
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.searchProducts,
      requestType: RequestType.POST,
      pathVariables: [offset.toString()],
      body: filters
    }).pipe(
      map((response) => ProductModel.fromJson(response))
    )
  }

  addProductReview(productId: string, rating: string, comment: string, orderId: string): Observable<string> {
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.submitProductReview,
      requestType: RequestType.POST,
      body: {
        product_id: productId,
        comment: comment,
        rating: rating,
        order_id: orderId
      }
    }).pipe(
      map(res => res['message'])
    )
  }

  checkAvailability(cartProducts: CartProductItem[]) {
    let jsonBody: { [key: string]: any } = {}
    jsonBody['cart'] = []
    for (let cartItem of cartProducts) {
      jsonBody['cart'].push({
        product_id: cartItem.product.id,
        price: cartItem.product.price?.toString(),
        discount_amount: 0,
        quantity: cartItem.count,
        tax_amount: 0,
        variant: [],
        variations: cartItem.variations.isNotEmpty() ?
          cartItem.variations.map((variation) => {
            return {
              name: variation.name,
              values: [...variation.values.map((variationValue) => {
                return {
                  label: variationValue.optionLabel
                }
              })]
            }
          }) : [],
        // add_on_ids: cartItem.productAddOns.map((addOn) => addOn.id),
        add_on_ids: [],
        add_on_qtys: []
        // add_on_qtys: this.addOnQtys,
      })
    }
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.checkAvailability,
      requestType: RequestType.POST,
      body: jsonBody
    })
  }

}
