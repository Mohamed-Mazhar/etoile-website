import {Component, OnInit} from '@angular/core';
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  activeTab = 'shipping'
  loading = false
  addresses: AddressModel[] = []

  constructor(
    private addressApi: AddressApi
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.addresses = addresses
      },
      error: (err) => {
        this.loading = false
        console.log("Error received inside get Address", err)
      }
    })
    AppEventBroadcaster.on({event: AppEvent.userAddressesChanged}).subscribe({
      next: (_) => {
        this.reloadUserAddresses()
      }
    })
  }

  moveToPayment() {
    this.activeTab = 'payment'
  }

  moveToConfirm() {
    this.activeTab = 'confirm'
  }

  private reloadUserAddresses() {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.addresses = addresses
      },
      error: (err) => {
        this.loading = false
        console.log("Failed to reload addresses", err)
      }
    })
  }
}
