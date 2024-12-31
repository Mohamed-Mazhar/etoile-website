import { Component, OnInit } from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-delivery-return-policy',
  templateUrl: './delivery-return-policy.component.html',
  styleUrls: ['./delivery-return-policy.component.scss']
})
export class DeliveryReturnPolicyComponent implements OnInit {

  deliveryReturnPolicy: string = ""

  constructor(
    private configService: ConfigModelService
  ) { }

  ngOnInit(): void {
    this.configService.policyModelSubject.subscribe({
      next: (policyModel) => {
        this.deliveryReturnPolicy = policyModel?.returnPage?.content ?? ""
        this.deliveryReturnPolicy += "\n" + policyModel?.refundPage?.content ?? ""
      }
    })
  }

}
