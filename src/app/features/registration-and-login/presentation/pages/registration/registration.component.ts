import {Component, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  signup() {
    let password = this.formGroup.get('registrationPassword')
    let confirmPassword = this.formGroup.get('confirmPassword')
    if (password?.value !== confirmPassword?.value) {
      password?.setErrors({missMatch: "Passwords do not match"})
      confirmPassword?.setErrors({missMatch: "Passwords do not match"})
      return
    }
  }
}
