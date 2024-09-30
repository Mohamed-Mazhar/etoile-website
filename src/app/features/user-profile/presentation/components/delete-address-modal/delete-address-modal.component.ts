import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../../../../../common/services/address.service";
import {AddressApi} from "../../../../../common/apis/address-api";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-delete-address-modal',
  templateUrl: './delete-address-modal.component.html',
  styleUrls: ['./delete-address-modal.component.scss']
})
export class DeleteAddressModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  addressToDelete: AddressModel | null = null
  loading = false

  constructor(
    private addressService: AddressService,
    private addressApi: AddressApi
  ) {
  }

  ngOnInit(): void {
    this.addressService.addressSubject.subscribe({
      next: (address) => {
        console.log("Address to delete", address)
        this.addressToDelete = address
      }
    })
  }

  deleteAddress() {
    if (this.addressToDelete !== null) {
      this.loading = true
      this.addressApi.deleteAddress(this.addressToDelete).subscribe({
        next: (_) => {
          this.loading = false
          AppEventBroadcaster.publish({event: AppEvent.userAddressesChanged})
          this.closeElem.nativeElement.click()
        },
        error: (err) => {
          this.loading = false
          console.log("Error while deleting", err)
        }
      })
    }
  }

}