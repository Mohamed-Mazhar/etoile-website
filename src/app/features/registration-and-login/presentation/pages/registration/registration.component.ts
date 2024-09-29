import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {USER_INFO, USER_PASSWORD, USER_TOKEN} from "../../../../../common/utils/constants";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('close') closeIcon!: ElementRef
  formGroup: FormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue]
  })
  readonly InputType = InputType
  readonly Validators = Validators
  isLoading: boolean = false
  errorMessage: string | null = null

  constructor(
    private fb: FormBuilder,
    private registrationServiceApi: AuthenticationApi,
    private userProfileApi: UserProfileApi
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
    let mobileNumber = this.formGroup.get('mobile')?.value
    let email = this.formGroup.get('registrationEmail')?.value
    this.isLoading = true
    this.errorMessage = null
    this.registrationServiceApi.register({
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
        if (response.token) {
          this.getUserInfo()
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
}
