import {BaseApiService} from "./base-api-service";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {RequestType} from "../enums/RequestType";
import {ApiType} from "../enums/ApiType";
import {RegisterCustomerRequest} from "../data-classes/RegisterCustomerRequest";
import {LoginResponse} from "../data-classes/LoginResponse";

@Injectable({providedIn: 'root'})
export class AuthenticationApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  register(registerCustomerRequest: RegisterCustomerRequest): Observable<LoginResponse> {
    let splitNameIndex = registerCustomerRequest.userName.indexOf(" ")
    let firstName = registerCustomerRequest.userName.substring(0, splitNameIndex !== -1 ? splitNameIndex : registerCustomerRequest.userName.length)
    let lastName = registerCustomerRequest.userName.substring(splitNameIndex + 1)
    let registerRequest: { [key: string]: any } = {
      f_name: firstName,
      l_name: lastName,
      phone: registerCustomerRequest.phoneNumber,
      email: registerCustomerRequest.email,
      password: registerCustomerRequest.password,
    }
    if (registerCustomerRequest.referralCode?.hasActualValue()) {
      registerRequest['referral_code'] = registerCustomerRequest.referralCode
    }
    return this.baseApiService.call<{}, {}>({
      apiType: ApiType.registration,
      requestType: RequestType.POST,
      body: registerRequest
    }).pipe(
      map((response: { [key: string]: any }) => {
          return {
            token: response['token'],
            temporaryToken: response['temporary_token']
          }
        }
      )
    )
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.baseApiService.call<{}, {}>({
      apiType: ApiType.login,
      requestType: RequestType.POST,
      body: {
        email_or_phone: email,
        password: password,
        type: 'email'
      }
    }).pipe(
      map((response: { [key: string]: any }) => {
          return {
            token: response['token'],
            temporaryToken: response['temporary_token']
          }
        }
      )
    )
  }

}
