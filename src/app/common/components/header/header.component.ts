import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {Category} from "../../data-classes/Category";
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() categories: Category[] = []

  isMobileView: boolean = false

  currentLanguage = "en"
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.isMobileView = true
    }
  }

  goToHome() {
    this.router.navigate(['/']).then()
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.isMobileView = window.innerWidth < 770 && window.innerHeight < 1020;
  }

  dismissSearch() {
    AppEventBroadcaster.publish({event: AppEvent.hideSearchBarResult})
  }
}
