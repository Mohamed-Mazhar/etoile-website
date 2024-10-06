import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsApi} from "../../../../../common/apis/products-api";
import {Product} from "../../../../../common/data-classes/ProductModel";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string = ""
  charactersToSearch = ""
  products: Product[] = []

  params = {
    current: 13,
    max: 64
  }

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi
  ) {
  }

  ngOnInit(): void {
    this.charactersToSearch = this.route.snapshot.queryParamMap.get('product') ?? ""
    this.category = this.route.snapshot.params['category'];
    let categoryId = this.route.snapshot.queryParamMap.get('categoryId')
  }

}
