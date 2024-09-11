import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string = ""

  params = {
    current: 13,
    max: 64
  }

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    let categoryId = this.route.snapshot.queryParamMap.get('categoryId')
  }

}
