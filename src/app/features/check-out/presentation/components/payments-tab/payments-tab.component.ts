import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-payments-tab',
  templateUrl: './payments-tab.component.html',
  styleUrls: ['./payments-tab.component.scss']
})
export class PaymentsTabComponent implements OnInit {

  @Output() onPayClicked: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  moveToConfirm() {
    this.onPayClicked.emit()
  }
}
