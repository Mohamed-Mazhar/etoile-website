import { Component, OnInit } from '@angular/core';
import {Product} from "../../data-classes/Product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product : Product = {
    id: "212",
    price: 1200,
    name: "Croissant",
    description: "Made from exquisite butter"
  }
  imageSrc = ""

  ngOnInit(): void {
    this.imageSrc = ''
  }

  setDefaultPlaceholder() {
    this.imageSrc = "assets/product-placeholder.svg"
  }
}
