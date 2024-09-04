import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentLanguage = "en"
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang
    })
  }

  changeLanguage(language: string) {
    console.log("Change language to ", language)
    this.translate.use(language)
  }

}
