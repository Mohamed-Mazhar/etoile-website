import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {UntypedFormGroup, Validators} from "@angular/forms";
import {InputType} from "../inputs/enums/InputType";
import {AddressModel} from "../../data-classes/AddressModel";
import {AddressApi} from "../../apis/address-api";
import {Observable} from "rxjs";
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";
import {Branch} from "../../data-classes/ConfigModel";
import {SELECTED_BRANCH, USER_INFO} from "../../utils/constants";
import {DeliveryChargeByArea, DeliveryInfoModel} from "../../data-classes/DeliveryInfoModel";
import {ConfigModelService} from "../../services/config-model.service";
import {AnalyticsService} from "../../../features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../features/analytics/data/models/AnalyticsEvent";

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
  formGroup = new UntypedFormGroup({})
  address: AddressModel | null = null
  deliveryInfoModel: DeliveryInfoModel | null = null
  selectedZone: DeliveryChargeByArea | null = null

  constructor(
    private addressService: AddressService,
    private addressApi: AddressApi,
    private configService: ConfigModelService,
    private analyticsService: AnalyticsService
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
        }
        if (this.address !== null) {
          this.loading = true
          this.configService.getBranchDeliveryInfo(this.address.branchId!)
        } else {
          let currentBranch: Branch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
          this.configService.getBranchDeliveryInfo(currentBranch.id!)
        }
        this.configService.deliveryInfoSubject.subscribe({
          next: (deliveryInfo) => {
            if (deliveryInfo !== null) {
              this.loading = false
            }
            this.deliveryInfoModel = deliveryInfo
            let deliveryArea = this.deliveryInfoModel?.deliveryChargeByArea?.find((area) => area.id === this.address?.deliveryAreaId)
            if (deliveryArea) {
              this.selectedZone = deliveryArea
            }
          }
        })
        this.initializeViews()
      }
    })
  }

  initializeViews(): void {
    this.formGroup.get('contactPersonName')?.setValue(this.address?.contactPersonName)
    this.formGroup.get('contactPersonNumber')?.setValue(this.address?.contactPersonNumber)
    this.formGroup.get('floorNumber')?.setValue(this.address?.floorNumber)
    this.formGroup.get('streetNumber')?.setValue(this.address?.streetNumber)
    this.formGroup.get('houseNumber')?.setValue(this.address?.houseNumber)
    this.formGroup.get('contactAddress')?.setValue(this.address?.address)
  }

  updateAddress() {
    let selectedBranch: Branch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
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
          isDefault: false,
          branchId: selectedBranch.id,
          deliveryAreaId: this.selectedZone?.id
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
        if (this.address === null) {
          this.logAddressAdded(addressModel)
        }
        this.closeElem.nativeElement.click()
      },
      error: (err) => {
        this.loading = false
        console.log("Failed to update Address ", err)
      }
    })
  }

  private logAddressAdded(addressModel: AddressModel) {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    this.analyticsService.logEvent({
      event: AnalyticsEvent.addressAdded,
      parameters: new Map<string, any>([
        ['user_id', userInfo.id],
        ['timestamp', new Date().getTime()],
        ['city', addressModel.address]
      ])
    })
  }

}
