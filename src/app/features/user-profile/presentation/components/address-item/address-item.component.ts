import {Component, Input, OnInit} from '@angular/core';
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressService} from "../../../../../common/services/address.service";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss']
})
export class AddressItemComponent implements OnInit {

  @Input() address!: AddressModel

  constructor(
    private addressApi: AddressApi,
    private addressService: AddressService
  ) {
  }

  ngOnInit(): void {
  }

  setAsDefault() {
    let defaultAddress: AddressModel = new AddressModel(
      {...Object.assign({}, this.address, {isDefault: true})})
    this.addressApi.updateAddress(defaultAddress).subscribe({
      next: (_) => {
        AppEventBroadcaster.publish({event: AppEvent.userAddressesChanged})
      },
      error: (err) => {
        console.log("Error while set default", err)
      }
    })
  }

  editAddress() {
    this.addressService.setAddress(this.address)
  }

  deleteAddress() {
    this.addressService.setAddress(this.address)
  }
}
