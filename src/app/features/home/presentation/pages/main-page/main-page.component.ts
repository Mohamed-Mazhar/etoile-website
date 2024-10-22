import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {BannersApi} from "../../../../../common/apis/banners-api";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {BannerModel} from "../../../../../common/data-classes/BannerModel";
import {Product, ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ProductsService} from "../../../../../common/services/products.service";
import {AppEventBroadcaster} from "../../../../../common/app-events/app-event-broadcaster";
import {AppEvent} from "../../../../../common/app-events/app-event";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @ViewChild('openDelete') openDeleteElem!: ElementRef
  configModel: ConfigModel | null = null
  banners: BannerModel[] = []
  latestProducts: ProductModel | null = null
  popularProducts: ProductModel | null = null
  recommendedProducts: ProductModel | null = null
  bestSellerProducts: ProductModel | null = null
  chunkedBestSellerProducts: Product[][] = []
  chunkedRecommendedProducts: Product[][] = []
  chunkSize: number = 2

  constructor(
    private configModelService: ConfigModelService,
    private bannersApi: BannersApi,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.chunkSize = 1
    } else {
      this.chunkSize = 2
    }
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
      next: (products) => {
        if (products !== null) {
          this.recommendedProducts = products
          this.chunkedRecommendedProducts = this.chunkProducts(products!.products!)
        }
      }
    })
    this.productsService.frequentlyBoughtProducts.subscribe({
      next: (products) => {
        if (products !== null) {
          this.bestSellerProducts = products
          this.chunkedBestSellerProducts = this.chunkProducts(products!.products!)
        }
      }
    })
    AppEventBroadcaster.on({event: AppEvent.showRemoveProductAlert}).subscribe({
      next: (_) => {
        this.openDeleteElem.nativeElement.click()
      }
    })
  }

  private getHomeBanners() {
    this.bannersApi.getBanners().subscribe({
      next: (response) => {
        this.banners = response
      }
    })
  }

  chunkProducts(products: Product[]): Product[][] {
    const result = [];
    for (let i = 0; i < products.length; i += this.chunkSize) {
      result.push(products.slice(i, i + this.chunkSize));
    }
    return result;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.chunkSize = window.innerWidth < 770 && window.innerHeight < 1020 ? 1 : 2
    this.chunkedRecommendedProducts = this.chunkProducts(this.recommendedProducts?.products ?? [])
    this.chunkedBestSellerProducts = this.chunkProducts(this.bestSellerProducts?.products ?? [])

  }

}
