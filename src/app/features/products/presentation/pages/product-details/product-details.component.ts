import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../common/data-classes/ProductModel";
import {ActivatedRoute} from "@angular/router";
import {ProductsApi} from "../../../../../common/apis/products-api";
import {CartProductsService} from "../../../../../common/services/cart-products.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null
  loading = false
  productRating = 0
  productCount = 1

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi,
    private cartService: CartProductsService
  ) {

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];
    this.loading = true
    this.productsApi.getProductDetails(productId).subscribe({
      next: (product) => {
        this.loading = false
        this.product = product
        this.productRating = product.rating?.reduce((pre, current) => {
            return pre + current.average!
          }, 0
        )! / product.rating?.length!
      },
      error: (err) => {
        this.loading = false
        console.log("Error received in product details", err)
      }
    })
  }

  increaseProductCount() {
    this.productCount++
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--
    }
  }

  addToCart() {
    this.cartService.addProduct({
      product: this.product!,
      count: this.productCount
    })
  }
}
