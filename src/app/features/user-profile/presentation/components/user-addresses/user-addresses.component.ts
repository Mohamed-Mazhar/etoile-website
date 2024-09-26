import {Component, Input, OnInit} from '@angular/core';
import {AddressModel} from "../../../../../common/data-classes/AddressModel";

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss']
})
export class UserAddressesComponent implements OnInit {

  @Input() addresses: AddressModel[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
