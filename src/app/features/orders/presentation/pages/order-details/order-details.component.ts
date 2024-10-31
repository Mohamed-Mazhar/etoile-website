import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {OrderDetailsModel} from "../../../../../common/data-classes/OrderDetailsModel";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  loading = false
  ordersDetails: OrderDetailsModel[] = []

  constructor(
    private route: ActivatedRoute,
    private ordersApi: OrdersApi
  ) { }

  ngOnInit(): void {
    let orderId = this.route.snapshot.queryParamMap.get('id')
    this.loading = true
    this.ordersApi.getOrderDetails(orderId!).subscribe({
      next: (orderDetails) => {
        console.log("Orders fetched")
        this.loading = false
        this.ordersDetails = [...orderDetails]
      },
      error: (err) => {
        this.loading = false
      }
    })
  }


  getProductsPrice() {
    let price = 0
    this.ordersDetails.forEach((orderDetails) => {
      price += orderDetails.price ?? 0
    })
    return price
  }

  getTotalPrice() {

  }

}
