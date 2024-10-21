import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../../../common/data-classes/OrderModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  @Input() orders: OrderModel[] = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDetails(id: number) {

  }
}
