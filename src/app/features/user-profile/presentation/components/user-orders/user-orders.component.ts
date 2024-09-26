import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../../../common/data-classes/OrderModel";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  @Input() orders: OrderModel[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
