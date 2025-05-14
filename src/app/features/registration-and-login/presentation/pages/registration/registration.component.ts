import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {USER_INFO, USER_PASSWORD, USER_TOKEN} from "../../../../../common/utils/constants";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";
import {AdjustEvent} from "../../../../analytics/data/models/AdjustEvent";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('close') closeIcon!: ElementRef
  @ViewChild('openVerification') verificationPage!: ElementRef
  formGroup: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue]
  })
  readonly InputType = InputType
  readonly Validators = Validators
  isLoading: boolean = false
  errorMessage: string | null = null

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationApi: AuthenticationApi,
    private userProfileApi: UserProfileApi,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {
  }

  signup() {
    let password = this.formGroup.get('registrationPassword')
    let confirmPassword = this.formGroup.get('confirmPassword')
    if (password?.value !== confirmPassword?.value) {
      password?.setErrors({missMatch: "Passwords do not match"})
      confirmPassword?.setErrors({missMatch: "Passwords do not match"})
      return
    }
    let name = this.formGroup.get('name')?.value
    let countryCode = this.formGroup.get('countryCode')?.value
    let phone = this.formGroup.get('mobile')?.value
    let mobileNumber = `${phone}`
    let email = this.formGroup.get('registrationEmail')?.value
    this.isLoading = true
    this.errorMessage = null
    this.authenticationApi.register({
      email: email,
      password: password?.value,
      userName: name,
      phoneNumber: mobileNumber,
      referralCode: null
    }).subscribe({
      next: (response) => {
        this.isLoading = false
        localStorage.setItem(
          USER_TOKEN,
          response.token?.hasActualValue() ? response.token : (response.temporaryToken ?? '')
        )
        localStorage.setItem(USER_PASSWORD, password?.value)
        console.log("Response inside the component ", response)
        if (response.token !== null && response.token !== undefined) {
          this.getUserInfo()
          this.analyticsService.logAdjustEvent({event: AdjustEvent.newRegister})
        } else if (response.temporaryToken !== null && response.temporaryToken !== undefined) {
          this.checkPhone(mobileNumber)
        } else {
          this.closeIcon.nativeElement.click()
        }
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
        // console.log("Error received during register", err)
      }
    })
  }

  getUserInfo() {
    this.isLoading = true
    this.userProfileApi.getUserProfile().subscribe({
      next: (response) => {
        this.closeIcon.nativeElement.click()
        this.isLoading = false
        localStorage.setItem(USER_INFO, JSON.stringify(response))
        AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
      }
    })
  }

  private checkPhone(mobileNumber: string) {
    this.isLoading = true
    this.authenticationApi.checkPhone(mobileNumber).subscribe({
      next: (_) => {
        this.isLoading = false
        AppEventBroadcaster.publish({event: AppEvent.checkPhoneCalled, data: mobileNumber})
        this.verificationPage.nativeElement.click()
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
      }
    })
  }
}
