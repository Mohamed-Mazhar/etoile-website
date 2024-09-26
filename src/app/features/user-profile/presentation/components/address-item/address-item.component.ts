import {Component, Input, OnInit} from '@angular/core';
import {AddressModel} from "../../../../../common/data-classes/AddressModel";

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss']
})
export class AddressItemComponent implements OnInit {

  @Input() address!: AddressModel
  constructor() { }

  ngOnInit(): void {
  }

}
