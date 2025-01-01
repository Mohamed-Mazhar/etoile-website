import { Injectable } from '@angular/core';
import {ConfigModel} from "../data-classes/ConfigModel";
import {BehaviorSubject} from "rxjs";
import {Category} from "../data-classes/Category";
import {PolicyModel} from "../data-classes/PolicyModel";
import {DeliveryInfoModel} from "../data-classes/DeliveryInfoModel";
import {SplashApi} from "../apis/splash-api";

@Injectable({
  providedIn: 'root'
})
export class ConfigModelService {

  public configModelSubject = new BehaviorSubject<ConfigModel | null>(null)
  public categoriesSubject = new BehaviorSubject<Category[]>([])
  public policyModelSubject = new BehaviorSubject<PolicyModel | null>(null)
  public deliveryInfoSubject = new BehaviorSubject<DeliveryInfoModel | null>(null)
  constructor(
    private splashApi: SplashApi
  ) { }

  setConfigModel(configModel: ConfigModel) {
    this.configModelSubject.next(configModel)
  }

  setCategories(categories: Category[]) {
    this.categoriesSubject.next(categories)
  }

  setPolicyModel(policyModel: PolicyModel) {
    this.policyModelSubject.next(policyModel)
  }

  getBranchDeliveryInfo(branchId: number) {
    this.splashApi.getBranchDeliveryAreas(branchId).subscribe({
      next: (deliveryInfo) => {
        console.log("Setting delivery info inside config service ", deliveryInfo)
        this.deliveryInfoSubject.next(deliveryInfo)
      }
    })
  }
}

