import {Component, OnInit} from '@angular/core';
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";
import {UserInfo} from "../../data-classes/UserInfo";
import {SELECTED_BRANCH, USER_INFO} from "../../utils/constants";
import {Branch} from "../../data-classes/ConfigModel";
import {Router} from "@angular/router";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfo | null = null
  selectedBranch: Branch | null = null

  constructor(
    private router: Router
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
  }

  logout() {
    localStorage.clear()
    AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
    this.router.navigate(['/']).then()
  }

}
