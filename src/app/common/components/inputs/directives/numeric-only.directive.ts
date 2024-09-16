import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {

  @Input() appNumericOnly: boolean = true;
  constructor() { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    if (!this.appNumericOnly) {
      return;
    }

    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

}
