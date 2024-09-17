import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {NameValidationError} from "../../../validators/name-validator";


@Component({
  selector: "mobile-number",
  templateUrl: "./mobile-number.component.html",
  styleUrls: ["./mobile-number.component.css"],
})
export class MobileNumberComponent implements OnInit {
  @Input() loadInputData?: BehaviorSubject<[any, any]>;

  @Input() isLoading: boolean = false;
  @Input() allowEditing: boolean = false;
  @Input() connectToServer: boolean = false;
  @Input() floatingMobileLabel?: string = "Mobile Number";
  @Input() floatingCodeLabel?: string = "Code";
  @Input() mobileNumberId!: string;
  @Input() countryCodeId!: string;

  @Input() group!: FormGroup;
  @Input() validators: ValidatorFn[] = [];

  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchChanged: EventEmitter<any> = new EventEmitter<any>();

  control: FormControl = new FormControl();
  countryControl: FormControl = new FormControl({value: "+02", disabled: true}, Validators.required);
  loadingTimeout: any;
  countryCode: string = "+20";
  mobileNumber: string = "";
  dropdownOpen: boolean = false;
  selectClicked: boolean = false;

  constructor() {
  }

  // get filteredOptions(): Country[] {
  //   let list = this.list;
  //   if (this.allowEditing && !this.connectToServer) {
  //     list = list.filter((option) =>
  //       option.nameEn.toLowerCase().includes(this.countryCode.toLowerCase())
  //     );
  //   }
  //   return list;
  // }

  get errorMessage(): string {
    let errorCountryCodeMessage = this.errorCountryCodeMessage;
    if (errorCountryCodeMessage.length > 0) {
      return errorCountryCodeMessage;
    }

    let errorMobileNumber = this.errorMobileNumberMessage;
    if (errorMobileNumber.length > 0) {
      return errorMobileNumber;
    }
    return "";
  }

  get errorMobileNumberMessage(): string {
    if (this.control.touched) {
      if (this.control.hasError(NameValidationError.invalidFormat)) {
        return $localize`:@@isInvalidFormatField:${this.floatingMobileLabel} is invalid Format`;
      } else if (this.control.hasError("required")) {
        return $localize`:@@isRequiredField:${this.floatingMobileLabel} is required.`
      } else if (
        this.control.hasError("minlength") ||
        this.control.hasError("maxLength")
      ) {
        return $localize`:@@isInvalidField:${this.floatingMobileLabel} is invalid`;
      }
    }
    // if (this.errorHandling) {
    //   return this.getErrorMessage();
    // }
    return "";
  }

  get errorCountryCodeMessage(): string {
    if (this.countryControl.touched) {
      if (this.countryControl.hasError(NameValidationError.invalidFormat)) {
        return `${this.floatingCodeLabel} is invalidFormat`;
      } else if (this.countryControl.hasError("required")) {
        return `${this.floatingCodeLabel} is required`;
      }
    }
    // if (this.errorHandling) {
    //   return this.getErrorMessage();
    // }
    return "";
  }

  ngOnInit(): void {
    let validators = [];
    validators.push(Validators.minLength(6));
    validators.push(...this.validators);

    this.control.setValidators(validators);
    this.countryControl.setValidators(Validators.required);
    this.group.addControl(this.mobileNumberId, this.control);
    this.group.addControl(this.countryCodeId, this.countryControl);

    this.loadInputData?.subscribe((data) => {
      this.updateViews(data);
    });

    // this.list = [
    //   {
    //     nameEn: "Egypt",
    //     nameAr: "مصر",
    //     iso2letter: "EG",
    //     iso3letter: "EGY",
    //     countryCode: "20",
    //     createdAt: "",
    //   },
    // ];
  }

  ngOnDestroy(): void {
    this.group?.removeControl(this.mobileNumberId);
    this.group?.removeControl(this.countryCodeId);
  }

  isInputValid(): string {
    let isMobileNumberInputValid = this.isMobileNumberInputValid();

    if (isMobileNumberInputValid.length > 0) {
      return isMobileNumberInputValid;
    }
    let isCountryCodeInputValid = this.isCountryCodeInputValid();
    if (isCountryCodeInputValid.length > 0) {
      return isCountryCodeInputValid;
    }
    return "";
  }

  isMobileNumberInputValid(): string {
    if (this.control.touched) {
      if (
        this.control.hasError("required") ||
        this.control.hasError(NameValidationError.invalidFormat)
      ) {
        return "is-invalid";
      }
    }
    if (this.errorMessage.length > 0) {
      return "is-invalid";
    }

    return "";
  }

  isCountryCodeInputValid(): string {
    if (this.countryControl.touched) {
      if (
        this.countryControl.hasError("required") ||
        this.countryControl.hasError(NameValidationError.invalidFormat)
      ) {
        return "is-invalid";
      }
    }
    if (this.errorMessage.length > 0) {
      return "is-invalid";
    }
    return "";
  }

  onSearchChange(event: any) {
    this.dropdownOpen = true;
    const value = (event.target as HTMLInputElement).value;
    if (!this.connectToServer) {
      return;
    }

    clearTimeout(this.loadingTimeout); // Clear any existing timeout
    // Show loading spinner after 500 milliseconds
    this.loadingTimeout = setTimeout(() => {
      // Show loading indicator
      this.onSearchChanged.emit(value);
    }, 1000);
  }

  updateCountrySelected(country: any) {
    if (country.isString()) {
      const selected = [country, this.mobileNumber];
      setTimeout(() => {
        this.updateViews(selected);
      }, 100);
    }
  }

  // onSelectCountry(option: any): void {
  //   let selected = option as Country;
  //   this.selectedCountry = selected;
  //   this.updateCountryCodeField();
  //   this.dropdownOpen = false;
  //   // this.onSelected.emit(option);
  // }

  updateViews(value: any) {
    const [countryCode, mobile] = value;
    // let country = this.getCountryByISOCode(countryCode);
    // this.selectedCountry = country;
    // this.updateCountryCodeField();
    this.mobileNumber = mobile;
    // if(selected != null){
    //   this.onSearchChanged?.emit(value);
    // }
  }

  // getCountryByISOCode(countryCode: string): Country | null {
  //   let search = countryCode.toLowerCase();
  //   let countryList = this.list;
  //   return (
  //     countryList.find(
  //       (country) =>
  //         country.countryCode.toLowerCase() === search ||
  //         country.iso3letter.toLowerCase() === search
  //     ) ?? null
  //   );
  // }

  // updateCountryCodeField() {
  //   let countryCode = this.selectedCountry?.countryCode ?? "";
  //   this.countryCode = countryCode.hasActualValue() ? `+ ${countryCode}` : "";
  // }
  //
  // getErrorMessage() {
  //   let id = this.mobileNumberId ?? "";
  //   let title = this.floatingMobileLabel ?? "";
  //   return this.errorHandling?.getValidationErrorMessage(id, title) ?? "";
  // }

  /* option views */
  toggleSelect(isOpen: boolean) {
    // if (isOpen == false) {
    //   this.updateCountryCodeField();
    // }

    this.dropdownOpen = isOpen;
  }

  onInputBlur() {
    // Delay hiding the select to allow for a click event on the select
    setTimeout(() => {
      if (!this.selectClicked) {
        this.toggleSelect(false);
      }
    }, 200);
  }

  onSelectBlur() {
    // Flag indicating that the select was clicked
    this.selectClicked = false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.allowEditing) {
      event.preventDefault();
    }
  }

  focusInputField(inputField: HTMLInputElement): void {
    inputField.focus();
  }
}
