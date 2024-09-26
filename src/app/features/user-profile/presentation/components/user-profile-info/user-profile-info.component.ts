import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup} from "@angular/forms";
import {UserInfo} from "../../../../../common/data-classes/UserInfo";

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit, AfterViewInit {

  @Input() userInfo!: UserInfo
  formGroup: FormGroup = new FormGroup({})

  constructor() {
  }

  ngAfterViewInit(): void {
    let username = this.formGroup.get('userName')
    let password = this.formGroup.get('password')
    let email = this.formGroup.get('email')
    let mobile = this.formGroup.get('mobileNumber')
    console.log("User name state is", username)
    username?.setValue(`${this.userInfo.fName} ${this.userInfo.lName}`)
    password?.setValue("* * * * * *")
    email?.setValue(this.userInfo.email)
    mobile?.setValue(this.userInfo.phone)
  }

  ngOnInit(): void {
  }

  changePassword() {

  }

  saveChanges() {

  }

  readonly InputType = InputType;
}
