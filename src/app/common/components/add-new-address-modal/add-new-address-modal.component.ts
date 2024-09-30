import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {FormGroup, Validators} from "@angular/forms";
import {InputType} from "../inputs/enums/InputType";
import {AddressModel} from "../../data-classes/AddressModel";
import {AddressApi} from "../../apis/address-api";
import {Observable} from "rxjs";
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";

@Component({
  selector: 'app-add-new-address-modal',
  templateUrl: './add-new-address-modal.component.html',
  styleUrls: ['./add-new-address-modal.component.scss']
})
export class AddNewAddressModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  readonly Validators = Validators;
  readonly InputType = InputType;
  title: string = ""
  loading = false
  formGroup = new FormGroup({})
  address: AddressModel | null = null

  constructor(
    private addressService: AddressService,
    private addressApi: AddressApi
  ) {
  }

  ngOnInit(): void {
    this.addressService.addressSubject.subscribe({
      next: (address) => {
        this.address = address
        if (address === null) {
          this.title = "Add Address"
        } else {
          this.title = "Update Address"
          this.initializeViews()
        }
      }
    })
  }

  initializeViews(): void {
    if (this.address !== null) {
      this.formGroup.get('contactPersonName')?.setValue(this.address?.contactPersonName)
      this.formGroup.get('contactPersonNumber')?.setValue(this.address?.contactPersonNumber)
      this.formGroup.get('floorNumber')?.setValue(this.address?.floorNumber)
      this.formGroup.get('streetNumber')?.setValue(this.address?.streetNumber)
      this.formGroup.get('houseNumber')?.setValue(this.address?.houseNumber)
      this.formGroup.get('contactAddress')?.setValue(this.address?.address)
    }
  }

  updateAddress() {
    let addressModel = new AddressModel({
      ...Object.assign(
        {},
        this.address,
        {
          addressType: 'Home',
          contactPersonName: this.formGroup.get('contactPersonName')?.value,
          contactPersonNumber: this.formGroup.get('contactPersonNumber')?.value,
          floorNumber: this.formGroup.get('floorNumber')?.value,
          streetNumber: this.formGroup.get('streetNumber')?.value,
          houseNumber: this.formGroup.get('houseNumber')?.value,
          address: this.formGroup.get('contactAddress')?.value,
          isDefault: false
        })
    })
    this.loading = true
    let apiCall: Observable<any>
    if (this.address === null) {
      apiCall = this.addressApi.addAddress(addressModel)
    } else {
      apiCall = this.addressApi.updateAddress(addressModel)
    }
    apiCall.subscribe({
      next: (_) => {
        this.loading = false
        AppEventBroadcaster.publish({event: AppEvent.userAddressesChanged})
        this.closeElem.nativeElement.click()
      },
      error: (err) => {
        this.loading = false
        console.log("Failed to update Address ", err)
      }
    })
  }

}
