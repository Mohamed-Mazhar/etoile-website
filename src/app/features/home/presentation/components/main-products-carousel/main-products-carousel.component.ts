import {Component, Input, OnInit} from '@angular/core';
import {BannerModel} from "../../../../../common/data-classes/BannerModel";
import {Router} from "@angular/router";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";
import {AdjustEvent} from "../../../../analytics/data/models/AdjustEvent";

@Component({
  selector: 'main-products-carousel',
  templateUrl: './main-products-carousel.component.html',
  styleUrls: ['./main-products-carousel.component.scss']
})
export class MainProductsCarouselComponent implements OnInit {

  @Input() banners: BannerModel[] = []
  @Input() bannersUrl: string = ""

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {

  }

  getImage(imageUrl: string): string {
    return this.bannersUrl + "/" + imageUrl
  }

  showProduct(banner: BannerModel) {
    this.analyticsService.logEvent({
      event: AnalyticsEvent.bannerClicked,
      parameters: new Map<string, any>([
        ['filename', banner.image],
        ['banner_id', banner.id]
      ])
    })
    this.analyticsService.logAdjustEvent({event: AdjustEvent.bannerClicked})
    if (banner.categoryId === null) {
      this.analyticsService.logAdjustEvent({event: AdjustEvent.productDetailsClicked})
      this.router.navigate(['/product', banner.productId]).then()
    } else {
      this.router.navigate(['/products', banner.categoryId]).then()
    }
  }

}
