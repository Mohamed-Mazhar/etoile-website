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

}
