import {Component, Input, OnInit} from '@angular/core';
import {BannerModel} from "../../../../../common/data-classes/BannerModel";

@Component({
  selector: 'main-products-carousel',
  templateUrl: './main-products-carousel.component.html',
  styleUrls: ['./main-products-carousel.component.scss']
})
export class MainProductsCarouselComponent implements OnInit {

  @Input() banners: BannerModel[] = []
  @Input() bannersUrl: string = ""

  constructor() {
  }

  ngOnInit(): void {

  }

  getImage(imageUrl: string): string {
    return this.bannersUrl + "/" + imageUrl
  }

}
