import { Injectable } from '@angular/core';
import {AddressModel} from "../data-classes/AddressModel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressSubject = new BehaviorSubject<AddressModel | null>(null)

  constructor() { }

  setAddress(address: AddressModel | null) {
    this.addressSubject.next(address)
  }

}
