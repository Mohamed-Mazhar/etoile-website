import {Component, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup, Validators} from "@angular/forms";
import {RegistrationServiceApi} from "../../../../../common/apis/registration-service-api";

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

  constructor(
    private registrationServiceApi: RegistrationServiceApi
  ) {
  }

  ngOnInit(): void {

  }

  forgetPassword() {

  }

  login() {
    console.log("Login clicked inside side bar")
    let email = this.formGroup.get('loginEmail')?.value
  }

}
