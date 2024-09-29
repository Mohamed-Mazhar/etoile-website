import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup, Validators} from "@angular/forms";
import {USER_INFO, USER_PASSWORD} from "../../../../../common/utils/constants";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  readonly InputType = InputType
  readonly Validators = Validators
  loading = false
  formGroup: FormGroup = new FormGroup({})
  constructor(
    private userProfileApi: UserProfileApi
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    let savedPassword = localStorage.getItem(USER_PASSWORD)
    let currentPassword = this.formGroup.get('currentPassword')
    let newPassword = this.formGroup.get('newPassword')
    let confirmPassword = this.formGroup.get('confirmPassword')
    if (currentPassword?.value !== savedPassword) {
      currentPassword?.setErrors({invalid: "Invalid password"})
    } else if (newPassword?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({missMatch: "Passwords do not match"})
      newPassword?.setErrors({missMatch: "Passwords do not match"})
    } else {
      this.loading = true
      let user = JSON.parse(localStorage.getItem(USER_INFO)!)
      this.userProfileApi.changePassword(user, newPassword?.value).subscribe({
        next: (_) => {
          this.loading = false
          this.closeElem.nativeElement.click()
          localStorage.setItem(USER_PASSWORD, newPassword?.value)
        },
        error: (err) => {
          this.loading = false
          console.log("Failed to change password", err)
        }
      })
    }
  }

}
