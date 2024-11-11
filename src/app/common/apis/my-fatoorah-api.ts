import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {MyFatoorahPaymentMethod} from "../data-classes/MyFatoorahPaymentMethod";

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

}
