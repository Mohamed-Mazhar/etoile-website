import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductsApi} from "../../../../../common/apis/products-api";
import {ToastService} from "../../../../../common/services/toast.service";

@Component({
  selector: 'app-add-product-review-modal',
  templateUrl: './add-product-review-modal.component.html',
  styleUrls: ['./add-product-review-modal.component.scss']
})
export class AddProductReviewModalComponent implements OnInit {

  @ViewChild('closeElem') closeElem!: ElementRef
  @Input() productId!: number
  star1 = "assets/images/in-active-star-icon.svg"
  star2 = "assets/images/in-active-star-icon.svg"
  star3 = "assets/images/in-active-star-icon.svg"
  star4 = "assets/images/in-active-star-icon.svg"
  star5 = "assets/images/in-active-star-icon.svg"
  selectedRate = 0
  form: FormGroup = new FormGroup({});
  control: FormControl = new FormControl()
  loading = false

  constructor(
    private productsApi: ProductsApi,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form.addControl('comment', this.control)
  }

  updateIcons(index: number) {
    this.star1 = index >= 1 ? "assets/images/active-star-icon.svg" : "assets/images/in-active-star-icon.svg"
    this.star2 = index >= 2 ? "assets/images/active-star-icon.svg" : "assets/images/in-active-star-icon.svg"
    this.star3 = index >= 3 ? "assets/images/active-star-icon.svg" : "assets/images/in-active-star-icon.svg"
    this.star4 = index >= 4 ? "assets/images/active-star-icon.svg" : "assets/images/in-active-star-icon.svg"
    this.star5 = index >= 5 ? "assets/images/active-star-icon.svg" : "assets/images/in-active-star-icon.svg"
  }

  clearRate() {
    if (this.selectedRate === 0) {
      this.updateIcons(0)
    } else {
      this.updateIcons(this.selectedRate)
    }
  }

  sendReview() {
    let comment = this.form.get('comment')?.value ?? ""
    this.loading = true
    let orderId = Date.now().toString()
    this.productsApi.addProductReview(this.productId.toString(), this.selectedRate.toString(), comment, orderId).subscribe({
      next: (res) => {
        this.loading = false
        this.toastService.showToast('normal', res)
        this.closeElem.nativeElement.click()
      },
      error: (err) => {
        this.loading = false
        console.log("Error when adding review ", err)
      }
    })
  }

}
