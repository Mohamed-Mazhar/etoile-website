import {Component, ElementRef, ViewChild} from '@angular/core';
import {UntypedFormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {ToastService} from "../../../../../common/services/toast.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  @ViewChild('close') closeElem!: ElementRef
  readonly Validators = Validators
  formGroup: UntypedFormGroup = new UntypedFormGroup({})
  isLoading = false
  errorMessage: string | null = null

  constructor(
    private authenticationApi: AuthenticationApi,
    private toastService: ToastService
  ) {
  }

  forget() {
    let email = this.formGroup.get('email')?.value
    this.errorMessage = null
    this.isLoading = true
    this.authenticationApi.forgetPassword(email).subscribe({
      next: (message) => {
        this.isLoading = false
        this.toastService.showToast('normal', message)
        this.closeElem.nativeElement.click()
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err
      }
    })
  }
}
