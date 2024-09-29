import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserInfo} from "../../../../../common/data-classes/UserInfo";
import {USER_INFO} from "../../../../../common/utils/constants";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-branch-header',
  templateUrl: './select-branch-header.component.html',
  styleUrls: ['./select-branch-header.component.scss']
})
export class SelectBranchHeaderComponent implements OnInit {

  userInfo : UserInfo | null = null
  currentLanguage = "en"
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang
    })
  }

  ngOnInit(): void {
    let user = localStorage.getItem(USER_INFO)
    if (user !== null) {
      this.userInfo = JSON.parse(user)
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language)
  }

  logout() {
    localStorage.clear()
    AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
    this.router.navigate(['/']).then()
  }
}
