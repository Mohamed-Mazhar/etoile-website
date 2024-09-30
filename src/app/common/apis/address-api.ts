import {Injectable} from "@angular/core";
import {BaseApiService} from "./base-api-service";
import {map, Observable} from "rxjs";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {AddressModel} from "../data-classes/AddressModel";

@Injectable({
  providedIn: 'root'
})
export class AddressApi {

  constructor(
    private baseApiService: BaseApiService
  ) {
  }

  getAddresses(): Observable<AddressModel[]> {
    return this.baseApiService.call<null, { [key: string]: any }[]>({
      apiType: ApiType.getAddresses,
      requestType: RequestType.GET
    }).pipe(
      map((response) => response.map(json => AddressModel.fromJson(json)))
    )
  }

  addAddress(addressModel: AddressModel): Observable<void> {
    let body = addressModel.toJson()
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.addAddress,
      requestType: RequestType.POST,
      body: body
    })
  }

  updateAddress(addressModel: AddressModel): Observable<void> {
    let body = addressModel.toJson()
    return this.baseApiService.call<{}, void>({
      apiType: ApiType.updateAddress,
      requestType: RequestType.UPDATE,
      body: body,
      pathVariables: [addressModel.id?.toString() ?? ""]
    })
  }

  deleteAddress(addressModel: AddressModel): Observable<void> {
    return this.baseApiService.call({
      apiType: ApiType.deleteAddress,
      requestType: RequestType.DELETE,
      pathVariables: [addressModel.id?.toString() ?? '']
    })
  }

}
