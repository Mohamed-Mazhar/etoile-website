import {Component, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {USER_TOKEN} from "../../../../../common/utils/constants";
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
        console.log("Returned response from login", response)
        localStorage.setItem(
          USER_TOKEN,
          response.token?.hasActualValue() ? response.token : (response.temporaryToken ?? '')
        )
        if (response.token) {
          // this.getUserInfo()
          AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
        }
      },
      error: (err) => {
        this.isLoading = false
        console.log("Error received inside login", err)
        this.errorMessage = err
      }
    })
  }

  getUserInfo(): void {
    this.userProfileApi.getUserProfile().subscribe({
      next: (response) => {

      }
    })
  }

}
