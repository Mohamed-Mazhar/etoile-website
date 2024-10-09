import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsApi} from "../../../../../common/apis/products-api";
import {Product} from "../../../../../common/data-classes/ProductModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {Category} from "../../../../../common/data-classes/Category";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string = ""
  charactersToSearch = ""
  products: Product[] = []
  loading = false
  offset = 1
  productsMaxPrice: number | null = null
  showLoadMore = true
  isLoadingMore = false
  filters: { [key: string]: any } | null = {}
  categories: Category[] = []
  loadingProductsFilter: boolean = false

  params = {
    current: this.products.length,
    max: 0
  }

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi,
    private configModelService: ConfigModelService
  ) {
  }

  ngOnInit(): void {
    this.charactersToSearch = this.route.snapshot.queryParamMap.get('name') ?? ""
    this.category = this.route.snapshot.params['category'];
    let categoryId = this.route.snapshot.queryParamMap.get('categoryId')
    this.loading = true
    if (this.charactersToSearch.hasActualValue()) {
      this.loadProducts(false, {name: this.charactersToSearch})
    } else if (categoryId?.hasActualValue()) {
      this.loadProducts(false, {category_id: [categoryId]})
    } else {
      this.loadProducts(false, null)
    }
    this.configModelService.categoriesSubject.subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  private loadProducts(isLoadingMore: boolean, filters: { [key: string]: any } | null) {
    this.filters = filters
    if (!isLoadingMore) {
      this.products = []
    }
    this.productsApi.searchProducts(this.offset, filters).subscribe({
      next: (productModel) => {
        this.loading = false
        this.isLoadingMore = false
        this.loadingProductsFilter = false
        this.productsMaxPrice = productModel.productMaxPrice!
        this.products.push(...productModel.products!)
        this.showLoadMore = productModel.products?.length! >= 10
        this.params = {
          current: this.products!.length,
          max: productModel.totalSize!
        }
      },
      error: (err) => {
        this.loading = false
        this.isLoadingMore = false
        console.log("Error while loading ", err)
      }
    })
  }

  loadMore() {
    this.offset++
    this.isLoadingMore = true
    this.loadProducts(true, this.filters)
  }

  applyFilter(categories: number[]) {
    this.loadingProductsFilter = true
    console.log("Applied filters ", categories)
    if (categories.isNotEmpty())
      this.loadProducts(false, {category_id: categories})
    else this.loadProducts(false, null)
  }

  applyButtonFilters(price: {maximum: number, minimum: number}) {
    let max = price.maximum
    let min = price.minimum
    console.log("Maximum and minimum price", max, min)
    let filters = this.filters
    if (max === 0 && min === 0) {
      return
    }
    if (filters !== null) {
      filters!['max_price'] = max
      filters!['min_price'] = min
    } else {
      filters = {
        max_price: max,
        min_price: min
      }
    }
    this.loadProducts(false, filters)
  }

  clearFilters() {
    if (this.filters !== null) {
      this.loadingProductsFilter = true
      this.loadProducts(false, null)
    }
  }

}
