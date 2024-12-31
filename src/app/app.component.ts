import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";
import {SplashApi} from "./common/apis/splash-api";
import {ConfigModelService} from "./common/services/config-model.service";
import {EXPIRE_BRANCH, EXPIRE_BRANCH_TIME, LANG, SELECTED_BRANCH} from "./common/utils/constants";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {NgcCookieConsentService, NgcStatusChangeEvent} from "ngx-cookieconsent";
import {AnalyticsService} from "./features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "./features/analytics/data/models/AnalyticsEvent";
import Adjust from "@adjustcom/adjust-web-sdk";
import {environment} from "../environments/environment";
import {AdjustEvent} from "./features/analytics/data/models/AdjustEvent";
import {Meta, Title} from "@angular/platform-browser";
import {CartProductsService} from "./common/services/cart-products.service";

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
    private analyticsService: AnalyticsService,
    private titleService: Title,
    private metaService: Meta,
    private cartService: CartProductsService
  ) {
    Adjust.initSdk({
      appToken: environment.adjustToken,
      environment: "production",
    });
    this.initializeSelectedBranch()
    this.scrollPageToTop()
    this.initializeLanguage()
    this.listenForLanguageChanges()
    this.splashApi.getAppConfigurations().subscribe({
      next: (res) => {
        this.configModelService.setConfigModel(res)
      }
    })

    this.splashApi.getPolicyPages().subscribe({
      next: (policyModel) => {
        this.configModelService.setPolicyModel(policyModel)
      }
    })

    this.cookieConsentService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
      if (event.status === 'allow') {
        this.initializeGTM();
      }
    });
    this.setAppMetaTags()
  }

  private initializeGTM() {
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=G-8KZJPHK13W';
    document.head.appendChild(gtmScript);
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

  private setAppMetaTags() {
    this.translate.get('SITE_TITLE').subscribe((title) => {
      this.titleService.setTitle(title)
    })
    this.translate.get('SITE_DESC').subscribe((desc) => {
      this.metaService.updateTag({name: 'description', content: desc})
    })
    this.translate.get('SITE_KEYWORDS').subscribe((keywords) => {
      this.metaService.updateTag({name: 'keywords', content: keywords});
    })
  }

  private listenForLanguageChanges() {
    this.translate.onLangChange.subscribe((event) => {
      this.setDirection(event.lang);
      this.translate.use(event.lang)
      this.analyticsService.logAdjustEvent({event: AdjustEvent.languageSelected})
      this.analyticsService.logEvent({
        event: AnalyticsEvent.languageChanged,
        parameters: new Map<string, any>([
          ['new_lang', event.lang],
          ['old_lang', event.lang === 'ar' ? 'en' : 'ar']
        ])
      })
    });
  }

  private scrollPageToTop() {
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
  }

  private initializeSelectedBranch() {
    let expiredBranch = localStorage.getItem(EXPIRE_BRANCH)
    console.log("Current time is", new Date().getTime())
    console.log("Expire  time is", expiredBranch)
    if (expiredBranch !== null && expiredBranch <= new Date().getTime().toString()) {
      localStorage.removeItem(SELECTED_BRANCH)
      localStorage.removeItem(EXPIRE_BRANCH)
      this.cartService.clearCart()
    } else {
      localStorage.setItem(EXPIRE_BRANCH, (new Date().getTime() + EXPIRE_BRANCH_TIME * 60 * 1000).toString())
    }
    if (localStorage.getItem(SELECTED_BRANCH) === null) {
      this.router.navigate(['/branch']).then()
    }
  }
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
