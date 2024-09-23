import {Injectable} from '@angular/core';
import {ProductsApi} from "../apis/products-api";
import {BehaviorSubject} from "rxjs";
import {ProductModel} from "../data-classes/ProductModel";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public latestProducts = new BehaviorSubject<ProductModel | null>(null)
  public popularProducts = new BehaviorSubject<ProductModel | null>(null)
  public recommendedProducts = new BehaviorSubject<ProductModel | null>(null)
  public frequentlyBoughtProducts = new BehaviorSubject<ProductModel | null>(null)

  constructor(
    private productsApi: ProductsApi
  ) {
  }

  loadProducts() {
    this.productsApi.getPopularProducts().subscribe({
      next: (products) => {
        this.popularProducts.next(products)
      }
    })
    this.productsApi.getLatestProducts().subscribe({
      next: (products) => {
        this.latestProducts.next(products)
      }
    })
    this.productsApi.getRecommendedProducts().subscribe({
      next: (products) => {
        this.recommendedProducts.next(products)
      }
    })
    this.productsApi.getFrequentlyBoughtProducts().subscribe({
      next: (products) => {
        this.frequentlyBoughtProducts.next(products)
      }
    })
  }

}
