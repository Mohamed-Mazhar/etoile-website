import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {PaymentMethod} from "../../../../../common/data-classes/ConfigModel";
import {PlaceOrderBody} from "../../../../../common/data-classes/PlaceOrderBody";
import {CartProductItem} from "../../../../cart/data/model/CartProductItem";

@Component({
  selector: 'app-payments-tab',
  templateUrl: './payments-tab.component.html',
  styleUrls: ['./payments-tab.component.scss']
})
export class PaymentsTabComponent implements OnInit {

  @Output() onPayClicked: EventEmitter<PaymentMethod> = new EventEmitter<PaymentMethod>()
  @Input()loading = false
  @Input() cartProducts: CartProductItem[] = []
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
      'CashOnDelivery',
      'Cash on delivery',
      '',
      '',
    )
  }

  placeOrder() {
    this.onPayClicked.emit(this.selectedPayment)
  }
}
