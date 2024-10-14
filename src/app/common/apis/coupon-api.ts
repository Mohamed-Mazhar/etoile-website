import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {CouponModel} from "../data-classes/CouponModel";

@Injectable({providedIn: 'root'})
export class CouponApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  applyCoupon(coupon: string): Observable<CouponModel> {
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.applyCoupon,
      requestType: RequestType.GET,
      pathVariables: [coupon]
    }).pipe(
      map((response) => CouponModel.fromJson(response))
    )
  }

}
