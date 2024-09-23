import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Category} from "../../data-classes/Category";

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[] = []

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
      queryParams: {
        categoryId: subCategory
      }
    }).then()
  }


  hasSubCategories(category: Category[]): boolean {
    return category.isNotEmpty();
  }
}
