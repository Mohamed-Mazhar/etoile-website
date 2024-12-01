import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Category} from "../../data-classes/Category";
import {AnalyticsService} from "../../../features/analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../features/analytics/data/models/AnalyticsEvent";

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[] = []

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {
  }

  loadCategory(category: Category) {
    this.analyticsService.logEvent({
      event: AnalyticsEvent.categoryClicked,
      parameters: new Map<string, any>([
        ['category_id', category.id],
        ['category_name', category.name]
      ])
    })
    this.router.navigate(['/products', category.name], {
      queryParams: {
        categoryId: category.id
      }
    }).then()
  }

  loadSubCategory(category: Category, subCategory: Category) {
    this.analyticsService.logEvent({
      event: AnalyticsEvent.categoryClicked,
      parameters: new Map<string, any>([
        ['category_id', subCategory.id],
        ['category_name', subCategory.name]
      ])
    })
    this.router.navigate(['/products', category.name], {
      queryParams: {
        categoryId: subCategory.id
      }
    }).then()
  }


  hasSubCategories(category: Category[]): boolean {
    return category.isNotEmpty();
  }
}
