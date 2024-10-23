import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserInfo} from "../../../../../common/data-classes/UserInfo";
import {USER_INFO} from "../../../../../common/utils/constants";
import {AddressModel} from "../../../../../common/data-classes/AddressModel";
import {AddressApi} from "../../../../../common/apis/address-api";
import {OrderModel} from "../../../../../common/data-classes/OrderModel";
import {OrdersApi} from "../../../../../common/apis/orders-api";
import {forkJoin} from "rxjs";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('ordersTab') ordersElem!: ElementRef
  userInfo: UserInfo | null = null
  userAddress: AddressModel[] = []
  userOrders: OrderModel[] = []
  loading: boolean = false
  defaultActiveTab = 'profile'

  constructor(
    private addressApi: AddressApi,
    private ordersApi: OrdersApi,
    private router: Router
  ) {
    let tab = this.router.getCurrentNavigation()?.extras.state as { tab: string }
    console.log("State variable inside constructor ", tab)
    this.defaultActiveTab = tab.tab
  }

  ngAfterViewInit(): void {
    if (this.defaultActiveTab === 'orders') {
      this.ordersElem.nativeElement.click()
    }
  }

  ngOnInit(): void {
    AppEventBroadcaster.on({event: AppEvent.userAddressesChanged}).subscribe({
      next: (_) => {
        this.reloadUserAddresses()
      }
    })
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

  private reloadUserAddresses() {
    this.loading = true
    this.addressApi.getAddresses().subscribe({
      next: (addresses) => {
        this.loading = false
        this.userAddress = addresses
      },
      error: (err) => {
        this.loading = false
        console.log("Failed to reload addresses", err)
      }
    })
  }
}
