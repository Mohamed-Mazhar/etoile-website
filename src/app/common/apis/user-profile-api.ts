import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";

@Injectable({providedIn: 'root'})
export class UserProfileApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getUserProfile(): Observable<void> {
    return this.baseApiService.call<null, void>({
      apiType: ApiType.userProfile,
      requestType: RequestType.GET
    })
  }
}
