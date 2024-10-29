import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";
import {SplashApi} from "./common/apis/splash-api";
import {ConfigModelService} from "./common/services/config-model.service";
import {LANG, SELECTED_BRANCH} from "./common/utils/constants";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {NgcCookieConsentService} from "ngx-cookieconsent";
import {AnalyticsService} from "./features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "./features/analytics/data/models/AnalyticsEvent";

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
    private configModelService: ConfigModelService,
    private gtmService: GoogleTagManagerService,
    private cookieConsentService: NgcCookieConsentService,
    private analyticsService: AnalyticsService
  ) {
    this.router.events.forEach((item) => {
      if (!(item instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      const gtmTag = {
        event: 'page',
        pageName: item.url
      };
      this.gtmService.pushTag(gtmTag).then();
    }).then()

    this.initializeLanguage()

    this.translate.onLangChange.subscribe((event) => {
      this.setDirection(event.lang);
      this.translate.use(event.lang)
      this.analyticsService.logEvent({
        event: AnalyticsEvent.languageChanged,
        parameters: new Map<string, any>([
          ['new_lang', event.lang],
          ['old_lang', event.lang === 'ar' ? 'en' : 'ar']
        ])
      })
    });

    this.splashApi.getAppConfigurations().subscribe({
      next: (res) => {
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

  private initializeLanguage() {

    let lang = localStorage.getItem(LANG)
    if (lang !== null) {
      this.translate.setDefaultLang(lang)
      this.translate.use(lang)
    } else {
      this.translate.setDefaultLang("en")
      this.translate.use("en")
    }
  }
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
