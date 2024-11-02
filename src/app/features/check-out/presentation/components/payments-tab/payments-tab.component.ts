import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {PaymentMethod} from "../../../../../common/data-classes/ConfigModel";

@Component({
  selector: 'app-payments-tab',
  templateUrl: './payments-tab.component.html',
  styleUrls: ['./payments-tab.component.scss']
})
export class PaymentsTabComponent implements OnInit {

  @Output() onPayClicked: EventEmitter<PaymentMethod> = new EventEmitter<PaymentMethod>()
  @Input()loading = false
  activePaymentMethods: PaymentMethod[] = []
  selectedPayment: PaymentMethod = this.defaultPayment

  constructor(
    private configService: ConfigModelService,
  ) {
  }

  ngOnInit(): void {
    this.configService.configModelSubject.subscribe({
      next: (config) => {
        this.activePaymentMethods = config?.activePaymentMethodList ?? []
      }
    })
  }

  onPaymentSelectionChanged(payment: PaymentMethod) {
    this.selectedPayment = payment
  }

  get defaultPayment() {
    return new PaymentMethod(
      'selfPickup',
      'Take away',
      '',
      '',
    )
  }

  placeOrder() {
    this.onPayClicked.emit(this.selectedPayment)
  }
}
