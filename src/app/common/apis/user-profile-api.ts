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

  updateUserProfile(firstName: string, lastName: string, phoneNumber: number, email: string): Observable<void> {
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.updateProfile,
      requestType: RequestType.UPDATE,
      body: {
        f_name: firstName,
        l_name: lastName,
        phone: phoneNumber,
        email: email
      }
    })
  }

  changePassword(user: UserInfo, newPassword: string): Observable<void> {
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.updateProfile,
      requestType: RequestType.UPDATE,
      body: {
        password: newPassword,
        f_name: user.fName,
        l_name: user.lName,
        phone: user.phone,
        email: user.email
      }
    })
  }
}
