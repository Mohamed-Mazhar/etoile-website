import {Component, Input, OnInit} from '@angular/core';
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AddressService} from "../../../../../common/services/address.service";

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss']
})
export class UserAddressesComponent implements OnInit {

  @Input() addresses: AddressModel[] = []

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
  }

  addNewAddress() {
    this.addressService.setAddress(null)
  }

}
