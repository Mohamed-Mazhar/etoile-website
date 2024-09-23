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

  // This is the array of items you want to pass to the child component
  section1 = [
    {title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img1.png'},
    {title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img2.png'},
    {title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img3.png'},
    {title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img1.png'},
    {title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img2.png'},
    {title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img3.png'}
  ];

  section2 = [
    {title: 'Rocher Torte 24', subtitle: '470 EGP', image: 'assets/images/home-asset/section2-img1.png'},
    {title: 'Four Seasons Torte 24', subtitle: '440 EGP', image: 'assets/images/home-asset/section2-img2.png'},
    {
      title: 'Knafeh with Mango Large Platter',
      subtitle: '230 EGP',
      image: 'assets/images/home-asset/section2-img3.png'
    },
    {title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img1.png'},
    {title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img2.png'},
    {title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img3.png'}
  ];


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
      next:(products) => this.popularProducts = products
    })
    this.productsService.latestProducts.subscribe({
      next:(products) => this.latestProducts = products
    })
  }

  private getHomeBanners() {
    this.bannersApi.getBanners().subscribe({
      next: (response) => {
        this.banners = response
      }
    })
  }


}
