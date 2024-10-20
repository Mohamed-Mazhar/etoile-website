import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Product} from "../../../../../common/data-classes/ProductModel";

@Component({
  selector: 'app-product-add-on-modal',
  templateUrl: './product-add-on-modal.component.html',
  styleUrls: ['./product-add-on-modal.component.scss']
})
export class ProductAddOnModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  product: Product | null = null

  constructor(
    private cartService: CartProductsService
  ) { }

  ngOnInit(): void {
    console.log("app-product-add-on-modal started")
    this.cartService.productToEditSubject.subscribe({
      next: (product) => {
        this.product = product
      }
    })
  }

  hasAddOns() {
    return this.product?.addOns?.isNotEmpty() === true;
  }

}
