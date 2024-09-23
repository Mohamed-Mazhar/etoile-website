import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";
import {SplashApi} from "./common/apis/splash-api";
import {ConfigModelService} from "./common/services/config-model.service";
import {SELECTED_BRANCH} from "./common/utils/constants";
import {Branch} from "./common/data-classes/ConfigModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'etoile-website';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private splashApi: SplashApi,
    private configModelService: ConfigModelService
  ) {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.translate.setDefaultLang("en")
    this.translate.use("en")
    this.translate.onLangChange.subscribe((event) => {
      this.setDirection(event.lang);
      this.translate.use(event.lang)
    });
    this.splashApi.getAppConfigurations().subscribe({
      next:(res) => {
        this.configModelService.setConfigModel(res)
      }
    })
    if (localStorage.getItem(SELECTED_BRANCH) === null) {
      this.router.navigate(['/branch']).then()
    }
  }

  setDirection(lang: string) {
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }
}
