import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {Category} from "../data-classes/Category";
import {ProductModel} from "../data-classes/ProductModel";

@Injectable({providedIn: 'root'})
export class CategoriesApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getMainCategories(): Observable<Category[]> {
    return this.baseApiService.call<null, { [key: string]: any }[]>({
      apiType: ApiType.categories,
      requestType: RequestType.GET
    }).pipe(
      map((response) => {
        return response.map((json) => Category.fromJson(json))
      })
    )
  }

  getSubCategories(mainCategoryId: number): Observable<Category[]> {
    return this.baseApiService.call<null, { [key: string]: any }[]>({
      apiType: ApiType.subCategories,
      requestType: RequestType.GET,
      pathVariables: [mainCategoryId.toString()]
    }).pipe(
      map((response) => {
        return response.map((json) => Category.fromJson(json))
      })
    )
  }

  getCategoryProducts(offset: number, categoryId: string, name: string | null): Observable<ProductModel> {
    let body: { [key: string]: any } = {
      offset: offset,
      product_type: 'all',
    }
    if (name !== null) {
      body['name'] = name
    }
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.categoryProducts,
      requestType: RequestType.GET,
      pathVariables: [categoryId ?? ''],
      body: body
    }).pipe(
      map((response) => ProductModel.fromJson(response))
    )
  }

}
