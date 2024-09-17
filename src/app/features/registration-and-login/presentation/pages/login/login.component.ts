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
    let email = this.formGroup.get('loginEmail')?.value
    let password = this.formGroup.get('loginPassword')?.value
    this.isLoading = true
    this.registrationServiceApi.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false
        console.log("Returned response from login", response)
      },
      error: (err) => {
        this.isLoading = false
        console.log("Error received inside login", err)
      }
    })
  }

}
