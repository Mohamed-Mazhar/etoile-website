import { Component, OnInit } from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutUsContent = ""
  constructor(
    private configService: ConfigModelService
  ) { }

  ngOnInit(): void {
    this.configService.policyModelSubject.subscribe({
      next: (policyModel) => {
        this.aboutUsContent = policyModel?.aboutUs ?? ""
      }
    })
  }

}
