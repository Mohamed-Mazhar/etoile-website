import { Component, OnInit } from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  termsAndCondition = ""

  constructor(
    private configService: ConfigModelService
  ) { }

  ngOnInit(): void {
    this.configService.policyModelSubject.subscribe({
      next: (policyModel) => {
        this.termsAndCondition = policyModel?.termsAndCondition ?? ""
      }
    })
  }

}
