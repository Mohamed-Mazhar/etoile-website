import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  loadCategory(category: string) {
    this.router.navigate(['/home/products', category]).then()
  }

  loadSubCategory(category: string, subCategory: string) {
    this.router.navigate(['/home/products', category], {
      queryParams : {
        categoryId: subCategory
      }
    }).then()
  }

}
