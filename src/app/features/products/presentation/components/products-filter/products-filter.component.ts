import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Category} from "../../../../../common/data-classes/Category";
import {CategoryCheckedModel} from "../../../data/models/CategoryCheckedModel";

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnChanges {

  @Input() priceRangeMax: number = 1000
  @Input() categories: Category[] = []
  @Output() onchange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() onClearClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output() onApplyButtonClicked: EventEmitter<{ minimum: number, maximum: number }> = new EventEmitter<{
    minimum: number,
    maximum: number
  }>()

  isMobileView: boolean = false
  priceRangeMin: number = 0
  filteredCategoriesId: number[] = []
  categoriesCheckedModel: CategoryCheckedModel[] = []
  maximumPrice: number = this.priceRangeMax
  minimumPrice: number = 0
  priceStep: number = 1;


  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['priceRangeMax'] && !changes['priceRangeMax'].firstChange) {
      this.maximumPrice = this.priceRangeMax
    }

    if (changes['categories']) {
      this.categoriesCheckedModel = [];
      this.categories.forEach((category) => {
        this.categoriesCheckedModel.push({
          categoryId: category.id!,
          categoryName: category.name!,
          isChecked: false,
          subCategories: this.getSubCategories(category.subCategories!),
          isExpanded: false
        });
      });
    }
  }


  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.isMobileView = true
    }
  }

  toggleCategoryExpansion(category: any): void {
    category.isExpanded = !category.isExpanded;
  }

  private getSubCategories(categories: Category[]): CategoryCheckedModel[] {
    let subCategories: CategoryCheckedModel[] = []
    categories.forEach((category) => {
      subCategories.push({
        categoryId: category.id!,
        categoryName: category.name!,
        isChecked: false,
        subCategories: [],
        isExpanded: false
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

  onMinPriceChange(event: any): void {
    const value = Number(event.target.value);

    if (value <= this.maximumPrice) {
      this.minimumPrice = value;
    } else {

      this.minimumPrice = this.maximumPrice - this.priceStep;
    }

    // Apply the filter with new price range
    this.applyPriceFilter();
  }

  onMaxPriceChange(event: any): void {
    const value = Number(event.target.value);

    if (value >= this.minimumPrice) {
      this.maximumPrice = value;
    } else {
      this.maximumPrice = this.minimumPrice + this.priceStep;
    }

    this.applyPriceFilter();
  }

// Apply price filter to your products
  applyPriceFilter(): void {

    console.log(`Price range updated: $${this.minimumPrice} - $${this.maximumPrice}`);

  }

  applyFilterButtonClicked() {
    this.onApplyButtonClicked.emit({minimum: this.minimumPrice, maximum: this.maximumPrice})
  }

  resetFilters() {
    this.categoriesCheckedModel.forEach((category) => {
      category.isChecked = false
      category.subCategories.forEach((subCategory) => {
        subCategory.isChecked = false
      })
    })
    // this.setPriceRange()
    this.onClearClicked.emit()
  }

  getMinPercent(): number {
    return (this.priceRangeMin / 1000) * 100; // Use your max value here
  }

  getRangeWidth(): number {
    return ((this.priceRangeMax - this.priceRangeMin) / 1000) * 100;
  }

  // private setPriceRange() {
  //   console.log("Setting price range")
  //   this.options = {
  //     floor: this.value,
  //     ceil: this.maxPrice,
  //     translate: (value: number, label: LabelType): string => {
  //       switch (label) {
  //         case LabelType.Low:
  //           return value + ' <b>EGP</b>';
  //         case LabelType.High:
  //           return value + ' <b>EGP</b>';
  //         default:
  //           return '$' + value;
  //       }
  //     }
  //   }
  // }
}
