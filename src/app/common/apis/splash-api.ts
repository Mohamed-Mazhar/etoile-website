import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ConfigModel} from "../data-classes/ConfigModel";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";

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

}
