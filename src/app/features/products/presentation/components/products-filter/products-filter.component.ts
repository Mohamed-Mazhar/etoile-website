import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LabelType} from "@angular-slider/ngx-slider";
import {Category} from "../../../../../common/data-classes/Category";
import {CategoryCheckedModel} from "../../../data/models/CategoryCheckedModel";

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnChanges {

  @Input() maxPrice!: number
  @Input() categories: Category[] = []
  @Output() onchange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() onClearClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output() onApplyButtonClicked: EventEmitter<{ minimum: number, maximum: number }> = new EventEmitter<{
    minimum: number,
    maximum: number
  }>()

  value: number = 20
  isMobileView: boolean = false
  options: any = {}
  filteredCategoriesId: number[] = []
  categoriesCheckedModel: CategoryCheckedModel[] = []
  maximumPrice: number = 0
  minimumPrice: number = 0

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPriceRange()
    this.categoriesCheckedModel = []
    this.categories.forEach((category) => {
      this.categoriesCheckedModel.push({
        categoryId: category.id!,
        categoryName: category.name!,
        isChecked: false,
        subCategories: this.getSubCategories(category.subCategories!)
      })
    })
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.isMobileView = true
    }
  }

  private getSubCategories(categories: Category[]): CategoryCheckedModel[] {
    let subCategories: CategoryCheckedModel[] = []
    categories.forEach((category) => {
      subCategories.push({
        categoryId: category.id!,
        categoryName: category.name!,
        isChecked: false,
        subCategories: []
      })
    })
    return subCategories
  }

  clear() {
    this.onClearClicked.emit()
  }

  format(value: number): string {
    return (value / 100).toString()
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.isMobileView = window.innerWidth < 770 && window.innerHeight < 1020;
  }

  toggleMainCategory(checkedCategory: CategoryCheckedModel) {
    checkedCategory.subCategories.forEach((subCategory) => {
      subCategory.isChecked = checkedCategory.isChecked
    })
    this.applyFilter()
  }

  applyFilter() {
    this.filteredCategoriesId = []
    this.categoriesCheckedModel.forEach((category) => {
      if (category.isChecked) {
        this.filteredCategoriesId.push(category.categoryId)
      }
      category.subCategories.forEach((subCategory) => {
        if (subCategory.isChecked) {
          this.filteredCategoriesId.push(subCategory.categoryId)
        }
      })
    })
    this.onchange.emit(this.filteredCategoriesId)
  }

  onMinPriceChange(event: any) {
    this.minimumPrice = event
  }

  onMaxPriceChange(event: any) {
    this.maximumPrice = event
  }

  applyFilterButtonClicked() {
    this.onApplyButtonClicked.emit({minimum: this.minimumPrice, maximum: this.maximumPrice})
  }

  resetFilters() {
    this.categoriesCheckedModel.forEach((category) => {
      category.isChecked = false
      category.subCategories.forEach((subCategory) => {
        subCategory.isChecked  = false
      })
    })
    this.setPriceRange()
    this.onClearClicked.emit()
  }

  private setPriceRange() {
    this.options = {
      floor: this.value,
      ceil: this.maxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return value + ' <b>EGP</b>';
          case LabelType.High:
            return value + ' <b>EGP</b>';
          default:
            return '$' + value;
        }
      }
    }
  }
}
