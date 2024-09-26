import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {RequestType} from "../enums/RequestType";
import {ApiType} from "../enums/ApiType";
import {OrderModel} from "../data-classes/OrderModel";
import {OrderDetailsModel} from "../data-classes/OrderDetailsModel";

@Injectable({providedIn: 'root'})
export class OrdersApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getOrders(): Observable<OrderModel[]> {
    return this.baseApiService.call<null, { [key: string]: any }[]>({
      apiType: ApiType.getUserOrders,
      requestType: RequestType.GET
    }).pipe(
      map((response) => {
        return response.map((json) => OrderModel.fromJson(json))
      })
    )
  }

  getOrderDetails(orderId: string): Observable<OrderDetailsModel[]> {
    return this.baseApiService.call<{}, { [key: string]: any }[]>({
      apiType: ApiType.getOrderDetails,
      requestType: RequestType.GET,
      body: {
        order_id: orderId
      }
    }).pipe(
      map((response) =>
        response.map(json => OrderDetailsModel.fromJson(json)))
    )
  }

}
