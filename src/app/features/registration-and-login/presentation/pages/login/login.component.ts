import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {UntypedFormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {USER_INFO, USER_PASSWORD, USER_TOKEN} from "../../../../../common/utils/constants";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {AdjustEvent} from "../../../../analytics/data/models/AdjustEvent";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly InputType = InputType;
  readonly Validators = Validators;
  @ViewChild('close') closeIcon!: ElementRef
  formGroup: UntypedFormGroup = new UntypedFormGroup({})
  isLoading: boolean = false
  errorMessage: string | null = null
  isMobileNumber = true

  constructor(
    private authenticationApi: AuthenticationApi,
    private userProfileApi: UserProfileApi,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {

  }

  forgetPassword() {
    this.isLoading = true
    // this.authenticationApi.forgetPassword()
  }

  login() {
    let email = this.formGroup.get('loginEmail')?.value
    let phone = this.formGroup.get('loginMobile')?.value
    let countryCode = this.formGroup.get('countryCode')?.value
    let mobileNumber = `${countryCode}${phone}`
    console.log("Entered phone ", [countryCode, phone])
    let password = this.formGroup.get('loginPassword')?.value
    this.isLoading = true
    this.errorMessage = null
    this.authenticationApi.login(this.isMobileNumber ? mobileNumber : email, password, this.isMobileNumber).subscribe({
      next: (response) => {
        this.isLoading = false
        localStorage.setItem(
          USER_TOKEN,
          response.token?.hasActualValue() ? response.token : (response.temporaryToken ?? '')
        )
        localStorage.setItem(USER_PASSWORD, password)
        if (response.token) {
          this.getUserInfo()
        } else {
          this.closeIcon.nativeElement.click()
        }
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
        this.analyticsService.logEvent({
          event: AnalyticsEvent.loginFailed,
          parameters: null
        })
      }
    })
  }

  getUserInfo(): void {
    this.isLoading = true
    this.userProfileApi.getUserProfile().subscribe({
      next: (response) => {
        this.closeIcon.nativeElement.click()
        this.isLoading = false
        localStorage.setItem(USER_INFO, JSON.stringify(response))
        this.analyticsService.logEvent({
          event: AnalyticsEvent.loginSuccess,
          parameters: new Map<string, any>([
            ['user_id', response.id]
          ])
        })
        this.analyticsService.logAdjustEvent({event: AdjustEvent.loginSuccess})
        AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
      }
    })
  }

}
