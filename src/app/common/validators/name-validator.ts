import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export enum NameValidationError {
  empty = "emptyName",
  tooShort = "tooShortName",
  tooLong = "tooLongName",
  invalidFormat = "invalidFormatName",
}

export class NameValidator {

  nameMinimumLength: number = 3;
  nameMaximumLength: number = 16;


  get validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value;
      if (value == null) {
        return null;
      } else if (this.isEmptyValue({text: value})) {
        return {emptyName: true}
      } else if (this.isMinimumLength({text: value})) {
        return {tooShortName: true}
      } else if (this.isMaxLength({text: value})) {
        return {tooLongName: true}
      } else if (this.invalidFormat({text: value})) {
        return {invalidFormatName: true}
      }
      return null;
    }
  }

  private isEmptyValue(data: { text: string | undefined | null }): boolean {
    return data.text?.length == 0;
  }

  isMinimumLength(data: { text: string | undefined | null }): boolean {
    const value = data.text;
    return (value?.length ?? 0) < this.nameMinimumLength;
  }

  isMaxLength(data: { text: string | undefined | null }): boolean {
    const value = data.text;
    return (value?.length ?? 0) > this.nameMaximumLength!;
  }


  invalidFormat(data: { text: string | undefined | null }): boolean {
    let value = data.text;
    value = value?.replace("'", "").replace(" ", "") ?? ''

    const regexp = new RegExp('^[a-zA-Z]+$');
    return !(regexp.test(value));
  }

}

