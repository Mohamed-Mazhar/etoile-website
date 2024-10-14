import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AddressService} from "../../../../../common/services/address.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-shipping-tab',
  templateUrl: './shipping-tab.component.html',
  styleUrls: ['./shipping-tab.component.scss']
})
export class ShippingTabComponent implements OnInit {

  @Output() onProceedClicked: EventEmitter<number> = new EventEmitter<number>();
  @Input() addresses: AddressModel[] = []
  formGroup: FormGroup = this.fb.group({
    deliveryAddress: ['', Validators.required]
  })

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  moveToPayment() {
    let address = this.formGroup.get('deliveryAddress')?.value
    this.onProceedClicked.emit(address)
  }

  setAddress(address: AddressModel) {
    this.addressService.setAddress(address)
  }

  addAddress() {
    this.addressService.setAddress(null)
  }

}
