import { Component, OnInit } from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacyContent = ""

  constructor(
    private configService: ConfigModelService
  ) { }

  ngOnInit(): void {
    this.configService.policyModelSubject.subscribe({
      next: (policyModel) => {
        this.privacyContent = policyModel?.privacyPolicy ?? ""
      }
    })
  }

}
