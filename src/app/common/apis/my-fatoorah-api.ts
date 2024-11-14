import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {MyFatoorahPaymentMethod} from "../data-classes/MyFatoorahPaymentMethod";
import {environment} from "../../../environments/environment";
import {MyFatoorahPaymentStatusResponse} from "../data-classes/MyFatoorahPaymentStatus";

@Injectable({providedIn: 'root'})
export class MyFatoorahApi {

  constructor(private baseApiService: BaseApiService) {
  }

  getPaymentGateWays(orderAmount: number): Observable<MyFatoorahPaymentMethod[]> {
    return this.baseApiService.callMyFatoorahApi<{}, { [key: string]: any }>({
      apiType: ApiType.initiatePayment,
      body: {
        InvoiceAmount: orderAmount,
        CurrencyIso: "SAR"
      }
    }).pipe(
      map((response) => {
        let paymentMethods = response['Data']['PaymentMethods']
        return paymentMethods.map((paymentMethod: {
          [key: string]: any
        }) => MyFatoorahPaymentMethod.fromJson(paymentMethod))
      })
    )
  }

  executePayment(paymentMethodId: number, orderAmount: number): Observable<string>  {
    return this.baseApiService.callMyFatoorahApi<{}, { [key: string]: any }>({
      apiType: ApiType.executePayment,
      body: {
        InvoiceValue: orderAmount,
        PaymentMethodId: paymentMethodId,
        CallBackUrl: `${environment.myFatoorahCallbackUrl}/checkout`
      }
    }).pipe(
      map((response) => {
        return response['Data']['PaymentURL']
      })
    )
  }

  getPaymentStatus(paymentId: string) : Observable<MyFatoorahPaymentStatusResponse>{
    return this.baseApiService.callMyFatoorahApi<{}, MyFatoorahPaymentStatusResponse>({
      apiType: ApiType.getPaymentStatus,
      body: {
        Key: paymentId,
        KeyType: 'PaymentId'
      }
    })
  }


}
