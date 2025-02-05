import {Component, Input} from '@angular/core';
import {DiscountAvailabilityModel} from "../../../../../common/data-classes/DiscountAvailabilityModel";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-discount-available-dialog',
  templateUrl: './discount-available-dialog.component.html',
  styleUrl: './discount-available-dialog.component.scss'
})
export class DiscountAvailableDialogComponent {

  @Input() discountAvailabilityModel: DiscountAvailabilityModel | null = null

  constructor(
    private translateService: TranslateService
  ) {
  }

  getDiscountText() {
    if (this.discountAvailabilityModel?.type === "free_delivery") {
      return this.translateService.instant('FREE_DELIVERY')
    } else {
      return this.translateService.instant(
        'DISCOUNT_MESSAGE',
        {discount: this.discountAvailabilityModel?.applicableAmount}
      )
    }
  }

}
