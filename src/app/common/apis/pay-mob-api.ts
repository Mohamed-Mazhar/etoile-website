import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable, of} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {environment} from "../../../environments/environment";
import {UserInfo} from "../data-classes/UserInfo";

@Injectable({providedIn: 'root'})
export class PayMobApi {

  constructor(private baseApiService: BaseApiService) {
  }

  createPaymentIntention(orderAmount: number, user: UserInfo): Observable<string> {
    let firstName = user.fName
    let lastName = user.lName
    if (!lastName?.hasActualValue() && firstName!.split(" ").length > 1) {
      lastName = firstName?.split(" ").last() ?? firstName
    }
    return this.baseApiService.callPayMobApis<{}, { [key: string]: any }>({
      apiType: ApiType.createPaymentIntention,
      headerKey: environment.payMobPrivate,
      body: {
        amount: orderAmount * 100,
        currency: "EGP",
        redirection_url: `${environment.payMobCallBackUrl}/checkout`,
        billing_data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: user.phone ?? ''
        },
        payment_methods: [
          4913094,
          "card",
          "etoile"
        ],
      }
    }).pipe(
      map((response) => {
        return response['client_secret']
      })
    )
  }

  getPaymentStatus(paymentId: string): Observable<any> {
    return of("")
    // return this.baseApiService.callPayMobApis<{}, MyFatoorahPaymentStatusResponse>({
    //   apiType: ApiType.getPaymentStatus,
    //   body: {
    //     Key: paymentId,
    //     KeyType: 'PaymentId'
    //   }
    // })
  }


}
