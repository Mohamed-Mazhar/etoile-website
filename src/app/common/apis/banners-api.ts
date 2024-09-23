import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {BannerModel} from "../data-classes/BannerModel";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";

@Injectable({providedIn: 'root'})
export class BannersApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getBanners(): Observable<BannerModel[]> {
    return this.baseApiService.call<null, { [key: string]: any }[]>({
      apiType: ApiType.banners,
      requestType: RequestType.GET
    }).pipe(
      map((response) => {
        return response.map(
          (bannerJson) => BannerModel.fromJson(bannerJson)
        )
      })
    )
  }

}
