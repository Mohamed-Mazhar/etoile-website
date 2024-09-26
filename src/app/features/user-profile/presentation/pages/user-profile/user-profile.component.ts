import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../../../../common/data-classes/UserInfo";
import {USER_INFO} from "../../../../../common/utils/constants";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AddressApi} from "../../../../../common/apis/address-api";
import {OrderModel} from "../../../../../common/data-classes/OrderModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userInfo: UserInfo | null = null
  userAddress: AddressModel[] = []
  userOrders: OrderModel[] = []
  loading : boolean = false

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi
  ) {
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    this.loading = true
    let addressApi = this.addressApi.getAddresses()
    let ordersApi = this.ordersApi.getOrders()
    forkJoin([addressApi, ordersApi]).subscribe({
      next: (result) => {
        this.loading = false
        this.userAddress = result[0]
        this.userOrders = result[1]
      },
      error: (err) => {
        this.loading = false
        console.log("Error ", err)
      }
    })
  }

  getUserName() {
    return `${this.userInfo?.fName} ${this.userInfo?.lName}`
  }

}
