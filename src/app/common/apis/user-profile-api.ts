import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {UserInfo} from "../data-classes/UserInfo";

@Injectable({providedIn: 'root'})
export class UserProfileApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getUserProfile(): Observable<UserInfo> {
    return this.baseApiService.call<null, {}>({
      apiType: ApiType.userProfile,
      requestType: RequestType.GET
    }).pipe(
      map((response: { [key: string]: any }) => {
          return UserInfo.fromJson(response)
        }
      )
    )
  }
}
