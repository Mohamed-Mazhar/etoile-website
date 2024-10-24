import {Component, Input, OnInit} from '@angular/core';
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";
import {UserInfo} from "../../data-classes/UserInfo";
import {LANG, SELECTED_BRANCH, USER_INFO} from "../../utils/constants";
import {Branch} from "../../data-classes/ConfigModel";
import {Router} from "@angular/router";
import {CartProductsService} from "../../services/cart-products.service";
import {TranslateService} from "@ngx-translate/core";

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

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cartService: CartProductsService
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
  }

  logout() {
    let selectedBranch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
    localStorage.clear()
    localStorage.setItem(SELECTED_BRANCH, JSON.stringify(selectedBranch))
    AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
    this.router.navigate(['/']).then()
  }

  changeLanguage(language: string) {
    this.translate.use(language)
    localStorage.setItem(LANG, language)
  }

}
