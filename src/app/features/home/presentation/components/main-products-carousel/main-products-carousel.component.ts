import {Component, Input, OnInit} from '@angular/core';
import {BannerModel} from "../../../../../common/data-classes/BannerModel";
import {Router} from "@angular/router";

@Component({
  selector: 'main-products-carousel',
  templateUrl: './main-products-carousel.component.html',
  styleUrls: ['./main-products-carousel.component.scss']
})
export class MainProductsCarouselComponent implements OnInit {

  @Input() banners: BannerModel[] = []
  @Input() bannersUrl: string = ""

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  getImage(imageUrl: string): string {
    return this.bannersUrl + "/" + imageUrl
  }

  showProduct(banner: BannerModel) {
    console.log("Selected banner is", banner)
    if (banner.categoryId === null) {
      this.router.navigate(['/product', banner.productId]).then()
    } else {
      this.router.navigate(['/products', banner.categoryId]).then()
    }
  }

}
