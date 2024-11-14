import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyFatoorahPaymentMethod} from "../../../../../common/data-classes/MyFatoorahPaymentMethod";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-my-fatoorah-payments-modal',
  templateUrl: './my-fatoorah-payments-modal.component.html',
  styleUrl: './my-fatoorah-payments-modal.component.scss'
})
export class MyFatoorahPaymentsModalComponent implements OnInit {

  @Input() myFatoorahPaymentMethods!: MyFatoorahPaymentMethod[]
  @Output() onPaymentSelected: EventEmitter<number> = new EventEmitter()

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {

  }

  getPaymentMethodName(paymentMethod: MyFatoorahPaymentMethod) {
    return this.translateService.currentLang === 'ar' ? paymentMethod.paymentMethodAr : paymentMethod.paymentMethodEn
  }

  setPaymentMethod(paymentMethodId: number) {
    this.onPaymentSelected.emit(paymentMethodId)
  }

}
