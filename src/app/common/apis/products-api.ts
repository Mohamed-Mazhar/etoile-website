import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {Product, ProductModel} from "../data-classes/ProductModel";

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

  searchProducts(name: string) : Observable<ProductModel> {
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.searchProducts,
      requestType: RequestType.POST,
      body: {
        name: name
      }
    }).pipe(
      map((response) => ProductModel.fromJson(response))
    )
  }

}
