import {Component, Input, OnInit} from '@angular/core';
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";
import {UserInfo} from "../../data-classes/UserInfo";
import {LANG, SELECTED_BRANCH, USER_INFO} from "../../utils/constants";
import {Branch} from "../../data-classes/ConfigModel";
import {NavigationEnd, Router} from "@angular/router";
import {CartProductsService} from "../../services/cart-products.service";
import {TranslateService} from "@ngx-translate/core";
import {AnalyticsService} from "../../../features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../features/analytics/data/models/AnalyticsEvent";
import {AdjustEvent} from "../../../features/analytics/data/models/AdjustEvent";
import {filter} from "rxjs";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() isMobileView: boolean = false

  userInfo: UserInfo | null = null
  selectedBranch: Branch | null = null
  cartItems = 0
  currentLanguage = "en"
  hideCart = false

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cartService: CartProductsService,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
    this.selectedBranch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
    AppEventBroadcaster.on({event: AppEvent.loadUserInfo}).subscribe({
      next: (_) => {
        this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)
        this.selectedBranch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
      }
    })
    this.cartService.cartProductsSubject.subscribe({
      next: (cartProducts) => {
        this.cartItems = cartProducts.length
      }
    })
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang
    })

    this.hideCart = this.router.url.includes('checkout')
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.hideCart = currentUrl.includes('checkout');
      })
  }

  logout() {
    let selectedBranch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
    localStorage.clear()
    localStorage.setItem(SELECTED_BRANCH, JSON.stringify(selectedBranch))
    AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
    this.analyticsService.logEvent({
      event: AnalyticsEvent.logout,
      parameters: null
    })
    this.analyticsService.logAdjustEvent({event: AdjustEvent.logout})
    this.router.navigate(['/']).then()
  }

  changeLanguage(language: string) {
    this.translate.use(language)
    localStorage.setItem(LANG, language)
    document.location.reload()
  }

}
