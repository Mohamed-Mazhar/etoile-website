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
    this.router.navigate(['/products', category]).then()
  }

  loadSubCategory(category: string, subCategory: string) {
    this.router.navigate(['/products', category], {
      queryParams : {
        categoryId: subCategory
      }
    }).then()
  }

}
