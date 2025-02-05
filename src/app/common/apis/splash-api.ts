import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ConfigModel} from "../data-classes/ConfigModel";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {PolicyModel} from "../data-classes/PolicyModel";
import {DeliveryInfoModel} from "../data-classes/DeliveryInfoModel";
import {CartProductItem, convertCartProductsToJson} from "../../features/cart/data/model/CartProductItem";
import {ProductPriceUtil} from "../utils/ProductPriceUtil";
import {DiscountAvailabilityModel} from "../data-classes/DiscountAvailabilityModel";

@Injectable({providedIn: 'root'})
export class SplashApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getAppConfigurations(): Observable<ConfigModel> {
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.appConfiguration,
      requestType: RequestType.GET,
    }).pipe(
      map((response) => {
        return ConfigModel.fromJson(response)
      })
    )
  }

  getPolicyPages(): Observable<PolicyModel> {
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.policyPage,
      requestType: RequestType.GET
    }).pipe(
      map((response) => {
        return PolicyModel.fromJson(response)
      })
    )
  }

  getBranchDeliveryAreas(branchId: number): Observable<DeliveryInfoModel> {
    return this.baseApiService.call<null, { [key: string]: any }>({
      apiType: ApiType.getDeliveryInfo,
      requestType: RequestType.GET,
      pathVariables: [branchId.toString()]
    }).pipe(
      map((response) => {
        return DeliveryInfoModel.fromJson(response)
      })
    )
  }

  checkDiscountAvailability(
    cartProducts: CartProductItem[],
    cartTotal: number,
    cartDiscount: number,
    couponDiscount: number
  ): Observable<DiscountAvailabilityModel> {
    let jsonBody: { [key: string]: any } = convertCartProductsToJson(cartProducts)
    jsonBody['cart_total'] = cartTotal
    jsonBody['cart_discount'] = cartDiscount
    jsonBody['coupon_discount'] = couponDiscount
    return this.baseApiService.call<{}, { [key: string]: any }>({
      apiType: ApiType.checkDiscountAvailability,
      requestType: RequestType.POST,
      body: jsonBody
    }).pipe(
      map((response) => {
        return DiscountAvailabilityModel.fromJson(response)
      })
    )
  }

}
