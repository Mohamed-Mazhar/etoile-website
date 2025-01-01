import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ConfigModel} from "../data-classes/ConfigModel";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {PolicyModel} from "../data-classes/PolicyModel";
import {DeliveryInfoModel} from "../data-classes/DeliveryInfoModel";

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

}
