import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() title: string = '';
  @Input() price: string = '';
  @Input() image: string = '';
  @Input() isAvailable: boolean = true
  @Output() addToCart = new EventEmitter()
  @Output() showDetails = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.addToCart.emit()
  }

  goToDetails() {
    this.showDetails.emit()
  }

}
