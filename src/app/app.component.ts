import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'etoile-website';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang("ar")
    this.translate.use("ar")
    this.translate.onLangChange.subscribe((event) => {
      this.setDirection(event.lang);
      this.translate.use(event.lang)
    });
  }

  setDirection(lang: string) {
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }
}
