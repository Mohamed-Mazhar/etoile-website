import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable, of} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {BranchProduct, Product, ProductModel, Rating} from "../data-classes/ProductModel";

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
    // return of(new Product(
    //     12,
    //     'Carrot Cake Gâteau',
    //     'It is (pasta, mozzarella cheese, white sauce, minced meat)',
    //     'assets/images/home-asset/section1-img2.png',
    //     3000,
    //     [],
    //     [],
    //     0,
    //     '',
    //     '',
    //     new BranchProduct(
    //       {
    //         id: 12,
    //         price: 3400,
    //         isAvailable: false
    //       }
    //     ),
    //     [
    //       new Rating({
    //           productId: 2212,
    //           average: 4
    //         }
    //       )
    //     ]
    //   )
    // )
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.productDetails,
      requestType: RequestType.GET,
      pathVariables: [productId]
    }).pipe(
      map(response => Product.fromJson(response))
    )
  }

}
