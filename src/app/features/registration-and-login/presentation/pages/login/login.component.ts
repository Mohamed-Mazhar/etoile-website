import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {USER_INFO, USER_TOKEN} from "../../../../../common/utils/constants";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly InputType = InputType;
  readonly Validators = Validators;
  @ViewChild('close') closeIcon!: ElementRef
  formGroup: FormGroup = new FormGroup({})
  isLoading: boolean = false
  errorMessage: string | null = null

  constructor(
    private registrationServiceApi: AuthenticationApi,
    private userProfileApi: UserProfileApi
  ) {
  }

  ngOnInit(): void {

  }

  forgetPassword() {

  }

  login() {
    let email = this.formGroup.get('loginEmail')?.value
    let password = this.formGroup.get('loginPassword')?.value
    this.isLoading = true
    this.errorMessage = null
    this.registrationServiceApi.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false
        localStorage.setItem(
          USER_TOKEN,
          response.token?.hasActualValue() ? response.token : (response.temporaryToken ?? '')
        )
        if (response.token) {
          this.getUserInfo()
        } else {
          this.closeIcon.nativeElement.click()
        }
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
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
        AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
      }
    })
  }

}
