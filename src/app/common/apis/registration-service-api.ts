import {BaseApiService} from "./base-api-service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RequestType} from "../enums/RequestType";
import {ApiType} from "../enums/ApiType";
import {RegisterCustomerRequest} from "../data-classes/RegisterCustomerRequest";

@Injectable({providedIn: 'root'})
export class RegistrationServiceApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  register(registerCustomerRequest: RegisterCustomerRequest): Observable<void> {
    let splitNameIndex = registerCustomerRequest.userName.indexOf(" ")
    let firstName = registerCustomerRequest.userName.substring(0, splitNameIndex)
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
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.registration,
      requestType: RequestType.POST,
      body: registerRequest
    })
  }

}
