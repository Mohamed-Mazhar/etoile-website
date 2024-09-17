import {Component, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationServiceApi} from "../../../../../common/apis/registration-service-api";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue]
  })
  readonly InputType = InputType
  readonly Validators = Validators
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private registrationServiceApi: RegistrationServiceApi
  ) {
  }

  ngOnInit(): void {
  }

  signup() {
    let password = this.formGroup.get('registrationPassword')?.value
    let confirmPassword = this.formGroup.get('confirmPassword')?.value
    if (password !== confirmPassword) {
      password?.setErrors({missMatch: "Passwords do not match"})
      confirmPassword?.setErrors({missMatch: "Passwords do not match"})
      return
    }
    let name = this.formGroup.get('name')?.value
    let mobileNumber = this.formGroup.get('mobile')?.value
    let email = this.formGroup.get('registrationEmail')?.value
    this.isLoading = true
    this.registrationServiceApi.register({
      email: email,
      password: password,
      userName: name,
      phoneNumber: mobileNumber,
      referralCode: null
    }).subscribe({
      next: (_) => {
        this.isLoading = false
        console.log("Registration success")
      },
      error: (err) => {
        this.isLoading = false
        console.log("Error received during register", err)
      }
    })
  }
}
