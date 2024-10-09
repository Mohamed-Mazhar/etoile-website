import { Component, OnInit } from '@angular/core';
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../../common/services/toast.service";

@Component({
  selector: 'app-remove-all-items-modal',
  templateUrl: './remove-all-items-modal.component.html',
  styleUrls: ['./remove-all-items-modal.component.scss']
})
export class RemoveAllItemsModalComponent implements OnInit {

  constructor(
    private cartService: CartProductsService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clearCart() {
    this.cartService.clearCart()
    this.toastService.showToast('alert','Cart cleared')
    this.router.navigate(['']).then()
  }

}
