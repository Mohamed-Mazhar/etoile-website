import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-select-branch-header',
  templateUrl: './select-branch-header.component.html',
  styleUrls: ['./select-branch-header.component.scss']
})
export class SelectBranchHeaderComponent implements OnInit {

  currentLanguage = "en"
  constructor(
    private translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang
    })
  }

  ngOnInit(): void {
  }

  changeLanguage(language: string) {
    this.translate.use(language)
  }
}
