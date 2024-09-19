import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shipping-tab',
  templateUrl: './shipping-tab.component.html',
  styleUrls: ['./shipping-tab.component.scss']
})
export class ShippingTabComponent implements OnInit {

  @Output() onProceedClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  moveToPayment() {
    this.onProceedClicked.emit()
  }

}
