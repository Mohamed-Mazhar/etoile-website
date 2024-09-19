import {Component, OnInit} from '@angular/core';
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AppEventBroadcaster.on({event: AppEvent.loadUserInfo}).subscribe({
      next: (event) => {
        console.log("AppEvent received inside user-info", event)
      }
    })
  }

}
