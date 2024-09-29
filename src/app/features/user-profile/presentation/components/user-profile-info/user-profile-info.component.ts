import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {AbstractControl, FormGroup} from "@angular/forms";
import {UserInfo} from "../../../../../common/data-classes/UserInfo";
import {UserProfileApi} from "../../../../../common/apis/user-profile-api";
import {USER_INFO} from "../../../../../common/utils/constants";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";
// import {Toast} from "bootstrap";

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit, AfterViewInit {

  @Input() userInfo!: UserInfo
  @ViewChild('myToast', {static: true}) toastEl!: ElementRef<HTMLDivElement>
  // toast: Toast | null = null;
  formGroup: FormGroup = new FormGroup({})
  loading = false
  username: AbstractControl | null = null
  password: AbstractControl | null = null
  email: AbstractControl | null = null
  mobile: AbstractControl | null = null
  showAlert = false

  constructor(
    private userProfileApi: UserProfileApi
  ) {
  }

  ngAfterViewInit(): void {
    this.username = this.formGroup.get('userName')
    this.password = this.formGroup.get('password')
    this.email = this.formGroup.get('email')
    this.mobile = this.formGroup.get('mobileNumber')

    this.username?.setValue(`${this.userInfo.fName} ${this.userInfo.lName}`)
    this.password?.setValue("* * * * * *")
    this.email?.setValue(this.userInfo.email)
    this.mobile?.setValue(this.userInfo.phone)
  }

  ngOnInit(): void {
    // this.toast = new Toast(this.toastEl.nativeElement, {});
  }

  changePassword() {

  }

  saveChanges() {
    this.showAlert = false
    if (
      this.username?.value === `${this.userInfo.fName} ${this.userInfo.lName}` &&
      this.email?.value === this.userInfo.email &&
      this.mobile?.value === this.userInfo.phone
    ) {
      this.showAlert = true
    } else {
      this.loading = true
      let splitNameIndex = this.username?.value.indexOf(" ")
      let firstName = this.username?.value.substring(0, splitNameIndex !== -1 ? splitNameIndex : this.username?.value.userName.length)
      let lastName = this.username?.value.substring(splitNameIndex + 1)
      this.userProfileApi.updateUserProfile(firstName, lastName, this.mobile?.value, this.email?.value).subscribe({
        next: (res) => {
          this.loading = false
          let newUser = Object.assign({}, this.userInfo, {
            fName: firstName,
            lName: lastName,
            email: this.email?.value,
            phone: this.mobile?.value
          })
          localStorage.setItem(USER_INFO, JSON.stringify(newUser))
          this.showToast()
          AppEventBroadcaster.publish({event: AppEvent.loadUserInfo})
        },
        error: (err) => {
          this.loading = false
          // console.log("Error received ", err)
        }
      })
    }
  }

  showToast() {
    // this.toast!.show();
  }

  readonly InputType = InputType;
}
