import {Component, OnInit} from '@angular/core';
import {InputType} from "../../../../../common/components/inputs/enums/InputType";
import {FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly InputType = InputType;
  readonly Validators = Validators;
  formGroup: FormGroup = new FormGroup({})

  constructor() {
  }

  ngOnInit(): void {

  }

  forgetPassword() {

  }

  login() {
    console.log("Login clicked inside side bar")
  }

}
