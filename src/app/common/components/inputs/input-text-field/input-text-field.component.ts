import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {InputType} from "../enums/InputType";
import {NameValidationError} from "../../../validators/name-validator";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "input-text-field",
  templateUrl: "./input-text-field.component.html",
  styleUrls: ["./input-text-field.component.scss"],
})

export class InputTextFieldComponent implements OnInit {
  @Input() loadData?: BehaviorSubject<any>;
  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();

  inputValue: string = "";

  @Input() inputType?: InputType = InputType.normal;
  @Input() floatingLabel?: string = "";
  @Input() id!: string;
  @Input() group!: FormGroup;
  @Input() validators: ValidatorFn[] = [];
  @Input() showEmailHint: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() enableNumericOnly: boolean = false;
  @Input() showPrefixIcon: boolean = false
  control: FormControl = new FormControl();
  isPasswordVisible: boolean = false;

  constructor(
    private translate: TranslateService
  ) {
  }

  get errorMessage(): string {
    // console.log(this.control.errors);
    if (this.control.touched) {
      if (this.control.hasError("minlength")) {
        let length = 8;
        return $localize`:@@minlengthField:${this.floatingLabel} must be more than ${length} characters.`;
      } else if (this.control.hasError("maxlength")) {
        return $localize`:@@isTooLongField:${this.floatingLabel} is too long.`;
      } else if (this.control.hasError("passwordStrength")) {
        return $localize`:@@passwordStrengthError:Password must contain at least one uppercase letter, one lowercase letter, a number and one special character.`;
      }

      if (this.control.hasError("email")) {
        return $localize`:@@isEmailInvalidField:Email is not valid.`;
      }
      if (this.control.hasError("invalid")) {
        let message = `${this.floatingLabel} is invalid`;
        if (this.control.errors && this.control.hasError("message")) {
          message = this.control.errors["message"];
        }
        return message
      } else if (this.control.hasError(NameValidationError.tooShort)) {
        return $localize`:@@isToShortField:${this.floatingLabel} is too short`;
      } else if (this.control.hasError(NameValidationError.tooLong)) {
        return $localize`:@@isTooLongField:${this.floatingLabel} is too long`;
      } else if (this.control.hasError(NameValidationError.invalidFormat)) {
        return $localize`:@@isInvalidFormatField:${this.floatingLabel} is invalid Format`;
      } else if (this.control.hasError("required")) {
        return this.translate.instant('IS_REQUIRED', {value: this.floatingLabel})
        // this.translate.get('IS_REQUIRED').subscribe({
        //
        // })
        // return $localize`:@@isRequiredField:${this.floatingLabel} is required.`;
      } else if (this.control.hasError('minlength') || this.control.hasError('maxlength')) {
        return $localize`:@@isInvalidField:${this.floatingLabel} is invalid`;
      } else if (this.control.hasError('missMatch')) {
        return $localize`:@@missMatch:Passwords do not match`
      }
    }

    return this.getErrorMessage();
  }

  ngOnInit(): void {
    let validators = [];
    validators.push(...this.validators);
    this.control.setValidators(validators);
    this.group.addControl(this.id, this.control);

    this.loadData?.subscribe((data) => {
      this.inputValue = data;
      this.updateViews(data);
    });
  }

  isInputValid(): string {
    // console.log("is touched == " + this.id + " " + this.control.touched);
    if (this.control.touched) {
      if (
        this.control.hasError("email") ||
        this.control.hasError("required") ||
        this.control.hasError(NameValidationError.tooShort) ||
        this.control.hasError(NameValidationError.tooLong) ||
        this.control.hasError(NameValidationError.invalidFormat) ||
        this.control.hasError("minLength")
      ) {
        // return $localize`:@@isInvalidField:${this.floatingLabel} is invalid`;
        return 'is-invalid'
      }
    }
    if (this.errorMessage) {
      // return $localize`:@@isInvalidField:${this.floatingLabel} is invalid`;
      return 'is-invalid'
    }
    return "";
  }

  isPasswordField(): boolean {
    return this.inputType == InputType.password || this.inputType == InputType.visiblePassword;
  }

  changePasswordState() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible
      ? InputType.visiblePassword
      : InputType.password;
  }

  getBackgroundImageStyle(): string {
    if (this.isPasswordField()) {
      return 'none';
    }
    return ''
  }


  visibilityIcon(): string {
    return this.isPasswordVisible ? "fa-eye-slash" : "fa-eye";
  }

  ngOnDestroy(): void {
    this.group?.removeControl(this.id);
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateViews(value);
  }

  updateViews(value: any) {
    this.onchange?.emit(value);
  }

  getErrorMessage() {
    let id = this.id ?? "";
    let title = this.floatingLabel ?? "";
    return "";
  }

  getPrefixIcon(): string {
    if (this.inputType === InputType.email) {
      return 'fa-user'
    } else if (this.inputType === InputType.password) {
      return 'fa-lock'
    } else if (this.inputType === InputType.visiblePassword) {
      return 'fa-lock'
    } else {
      return ''
    }
  }
}
