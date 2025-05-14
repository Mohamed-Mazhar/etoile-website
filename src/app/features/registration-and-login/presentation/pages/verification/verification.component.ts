import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core'
import {USER_INFO, USER_TOKEN} from "../../../../../common/utils/constants";
import {AuthenticationApi} from "../../../../../common/apis/authentication-api";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent implements AfterViewInit {

  @ViewChildren('otpInputs') otpInputs!: QueryList<ElementRef>
  @ViewChild('close') closeElem!: ElementRef
  otp: string[] = new Array(6).fill('')
  isButtonActive = false
  countdownTime: number = 30
  remainingTime: number = 0
  timerInterval: any
  mobileNumber = ""
  loading = false
  errorMessage: string | null = null

  constructor(
    private authenticationApi: AuthenticationApi,
    private userProfileApi: UserProfileApi
  ) {
  }

  ngAfterViewInit() {
    AppEventBroadcaster.on({event: AppEvent.checkPhoneCalled}).subscribe({
      next: (data) => {
        this.mobileNumber = data.data
      }
    })
    this.otpInputs.first.nativeElement.focus()
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault()
    const pastedValue = event.clipboardData?.getData('text') || ''

    this.otpInputs.forEach((inputRef, i) => {
      const inputElement = inputRef.nativeElement
      if (i < pastedValue.length) {
        inputElement.value = pastedValue[i]
        inputElement.removeAttribute('disabled')
      } else {
        inputElement.value = ''
      }
    })
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const currentInput = this.otpInputs.toArray()[index].nativeElement
    const nextInput = this.otpInputs.toArray()[index + 1]?.nativeElement
    const prevInput = this.otpInputs.toArray()[index - 1]?.nativeElement

    if (currentInput.value.length > 1) {
      currentInput.value = ''
      return
    }

    if (nextInput && nextInput.disabled && currentInput.value !== '') {
      nextInput.removeAttribute('disabled')
      nextInput.focus()
    }

    if (event.key === 'Backspace' && prevInput) {
      this.otpInputs.forEach((inputRef, i) => {
        if (index <= i) {
          inputRef.nativeElement.setAttribute('disabled', 'true')
          inputRef.nativeElement.value = ''
        }
      })
      prevInput.focus()
    }

    this.updateButtonState()
  }

  private updateButtonState() {
    this.isButtonActive = this.otpInputs.toArray().every(input => input.nativeElement.value !== '')
  }

  resendCode() {
    this.startCountdown()
    this.checkPhone()
  }

  verifySmsCode() {
    this.loading = true
    this.errorMessage = null
    let smsCode = ""
    for (let i = 0; i < this.otpInputs.length; i++) {
      smsCode += this.otpInputs.toArray()[i].nativeElement.value
    }
    this.authenticationApi.verifyPhone(this.mobileNumber, smsCode).subscribe({
      next: (response) => {
        this.loading = false
        let token = response['token']
        if (token.hasActualValue()) {
          localStorage.setItem(USER_TOKEN, token)
        }
        this.getUserInfo()
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err
      }
    })
  }

  getUserInfo(): void {
    this.loading = true
    this.userProfileApi.getUserProfile().subscribe({
      next: (response) => {
        this.closeElem.nativeElement.click()
        this.loading = false
        localStorage.setItem(USER_INFO, JSON.stringify(response))
        AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err
      }
    })
  }

  startCountdown() {
    this.remainingTime = this.countdownTime // Reset the remaining time

    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--
      } else {
        clearInterval(this.timerInterval)
      }
    }, 1000) // Update every 1 second
  }

  private checkPhone() {
    this.loading = true
    this.authenticationApi.checkPhone(this.mobileNumber).subscribe({
      next: (_) => {
        AppEventBroadcaster.publish({event: AppEvent.checkPhoneCalled, data: this.mobileNumber})
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err
      }
    })
  }
}
