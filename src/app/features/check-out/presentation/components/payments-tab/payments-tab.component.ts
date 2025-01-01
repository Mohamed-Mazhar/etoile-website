import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-payments-tab',
  templateUrl: './payments-tab.component.html',
  styleUrls: ['./payments-tab.component.scss']
})
export class PaymentsTabComponent implements OnInit {

  @Output() onPayClicked: EventEmitter<PaymentMethod> = new EventEmitter<PaymentMethod>()
  @Input() loading = false
  @Input() selectedAddressId!: number
  activePaymentMethods: PaymentMethod[] = []
  selectedPayment!: PaymentMethod
  digitalPaymentsActive = false
  isSelfPickUp = false

  constructor(
    private configService: ConfigModelService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    console.log("Selected address id is", this.selectedAddressId)
    this.configService.configModelSubject.subscribe({
      next: (config) => {
        this.activePaymentMethods = []
        this.activePaymentMethods = config?.activePaymentMethodList ?? []
        this.digitalPaymentsActive = config?.digitalPayment ?? false
        this.isSelfPickUp = config?.selfPickup ?? false
        // this.activePaymentMethods.push(new PaymentMethod(
        //   'my_fatoorah', this.translateService.instant('MY_FATOORAH'), ''
        // ))
      }
    })
    this.selectedPayment = this.defaultPayment
  }

  onPaymentSelectionChanged(payment: PaymentMethod) {
    console.log("Selected payment method onPaymentSelectionChanged", payment)
    this.selectedPayment = payment
  }

  get defaultPayment() {
    let defaultPayment;
    console.log("Selected address id is ", this.selectedAddressId)
    if (this.selectedAddressId === 0) {
      defaultPayment = new PaymentMethod(
        'cash_on_delivery',
        'Take away',
        '',
        '',
      )
    } else {
      defaultPayment = new PaymentMethod(
        'cash_on_delivery',
        'Delivery',
        '',
        '',
      )
    }
    console.log("Default payment inside default", defaultPayment)
    return defaultPayment
  }

  placeOrder() {
    console.log("Selected payment ", this.selectedPayment)
    this.onPayClicked.emit(this.selectedPayment)
  }

  getPayment() {
    if (this.selectedAddressId === 0) {
      return this.translateService.instant('CASH_ON_PICKUP')
    } else {
      return this.translateService.instant('CASH_ON_DELIVERY')
    }
  }
}
