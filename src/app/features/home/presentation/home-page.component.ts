import {Component, OnInit} from '@angular/core';
import {ConfigModel} from "../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../common/services/config-model.service";
import {Category} from "../../../common/data-classes/Category";
import {CategoriesApi} from "../../../common/apis/categories-api";
import {ProductModel} from "../../../common/data-classes/ProductModel";
import {ProductsService} from "../../../common/services/products.service";
import {ToastService} from "../../../common/services/toast.service";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  configModel: ConfigModel | null = null
  categories: Category[] = []
  loadingData: boolean = false
  latestProducts: ProductModel[] = []
  popularProducts : ProductModel[] = []
  showToast = false

  constructor(
    private configModelService: ConfigModelService,
    private categoriesApi: CategoriesApi,
    private productsService: ProductsService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (this.configModel === null) {
      this.loadingData = true
    }
    this.loadingData = !this.configModel
    this.configModelService.configModelSubject.subscribe({
      next: (configModel) => {
        if (configModel !== null) {
          this.configModel = configModel
          this.loadingData = false
          this.getCategories()
          this.productsService.loadProducts()
        }
      }
    })
    this.toastService.toastSubject.subscribe({
      next: (_) => {
        this.showToast = true
      }
    })
  }

  getCategories() {
    this.categoriesApi.getMainCategories().subscribe({
      next: (categoriesResponse) => {
        this.categories = categoriesResponse
        categoriesResponse.forEach((category) => {
          this.getSubCategories(category)
        })
      }
    })
  }

  getSubCategories(category: Category) {
    this.categoriesApi.getSubCategories(category.id!).subscribe({
      next: (subCategories) => {
        if (subCategories.isNotEmpty()) {
          let newCategory = Object.assign({}, category, {subCategories: subCategories})
          this.categories = this.categories.map((category) => category.id === newCategory.id ? newCategory : category)
          this.configModelService.setCategories(this.categories)
        }
      }
    })
  }
}
