import {Component, OnInit} from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {BannersApi} from "../../../../../common/apis/banners-api";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {BannerModel} from "../../../../../common/data-classes/BannerModel";
import {ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ProductsService} from "../../../../../common/services/products.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  configModel: ConfigModel | null = null
  banners: BannerModel[] = []
  latestProducts: ProductModel | null = null
  popularProducts: ProductModel | null = null
  bestSellerProducts: ProductModel | null = null
  recommendedProducts: ProductModel | null = null


  constructor(
    private configModelService: ConfigModelService,
    private bannersApi: BannersApi,
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.configModelService.configModelSubject.subscribe({
      next: (configModel) => {
        if (configModel !== null) {
          this.configModel = configModel
          this.getHomeBanners()
        }
      }
    })
    this.productsService.popularProducts.subscribe({
      next: (products) => this.popularProducts = products
    })
    this.productsService.latestProducts.subscribe({
      next: (products) => this.latestProducts = products
    })
    this.productsService.recommendedProducts.subscribe({
      next: (products) => this.recommendedProducts = products
    })
    this.productsService.frequentlyBoughtProducts.subscribe({
      next: (products) => this.bestSellerProducts = products
    })
  }

  private getHomeBanners() {
    this.bannersApi.getBanners().subscribe({
      next: (response) => {
        this.banners = response
      }
    })
  }

  shouldShowSpecial(): boolean {
    return this.recommendedProducts?.products?.isNotEmpty() === true ||
      this.popularProducts?.products?.isNotEmpty() === true
  }

}
