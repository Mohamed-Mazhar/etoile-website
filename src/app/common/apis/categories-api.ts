import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {Category} from "../data-classes/Category";

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

  getCategoryProducts(categoryId?: string, name?: string): Observable<void> {
    return this.baseApiService.call({
      apiType: ApiType.categoryProducts,
      requestType: RequestType.GET,
      pathVariables: [categoryId ?? ''],
      body: {
        product_type: 'all',
        search: name ?? ''
      }
    })
  }

}
