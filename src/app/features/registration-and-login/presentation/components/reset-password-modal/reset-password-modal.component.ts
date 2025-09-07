import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {ToastService} from "../../../../../common/services/toast.service";

@Component({
  selector: 'reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrl: './reset-password-modal.component.scss'
})
export class ResetPasswordModalComponent implements OnInit {

  @ViewChild('closeElem') closeElement!: ElementRef
  formGroup: UntypedFormGroup = new UntypedFormGroup({})
  isLoading = false
  errorMessage: string | null = null
  mobileNumber = ""
  resetToken = ""

  protected readonly Validators = Validators;
  protected readonly InputType = InputType;

  constructor(
    private authenticationApi: AuthenticationApi,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    AppEventBroadcaster.on({event: AppEvent.resetPasswordTokenVerified}).subscribe({
      next: (data) => {
        this.mobileNumber = data.data.mobileNumber
        this.resetToken = data.data.resetToken
      }
    })
  }

  resetPassword() {
    let password = this.formGroup.get('registrationPassword')
    let confirmPassword = this.formGroup.get('confirmPassword')
    if (password?.value !== confirmPassword?.value) {
      password?.setErrors({missMatch: "Passwords do not match"})
      confirmPassword?.setErrors({missMatch: "Passwords do not match"})
      return
    }
    this.isLoading = true
    this.authenticationApi.resetPassword(this.mobileNumber, this.resetToken, password?.value).subscribe({
      next: (response) => {
        this.isLoading = false
        this.toastService.showToast('normal', response['message'])
        this.closeElement.nativeElement.click()
      },
      error: (err) => {
        this.isLoading = false
        this.toastService.showToast('alert', err.toString())
      }
    })
  }
}
