import {Component, ElementRef, ViewChild} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {ToastService} from "../../../../../common/services/toast.service";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  @ViewChild('close') closeElem!: ElementRef
  @ViewChild('openVerification') verificationPage!: ElementRef
  readonly Validators = Validators
  formGroup: UntypedFormGroup = new UntypedFormGroup({})
  isLoading = false
  errorMessage: string | null = null
  isMobileNumber = true

  constructor(
    private authenticationApi: AuthenticationApi,
    private toastService: ToastService
  ) {
  }

  forget() {
    let email = this.formGroup.get('email')?.value
    let phone = this.formGroup.get('loginMobile')?.value
    let countryCode = this.formGroup.get('countryCode')?.value
    let mobileNumber = `${phone}`
    this.errorMessage = null
    this.isLoading = true
    this.authenticationApi.forgetPassword(this.isMobileNumber ? mobileNumber : email, this.isMobileNumber).subscribe({
      next: (message) => {
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
