import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductsApi} from "../../apis/products-api";
import {throttleTime} from "rxjs";
import {Product} from "../../data-classes/ProductModel";
import {ConfigModel} from "../../data-classes/ConfigModel";
import {ConfigModelService} from "../../services/config-model.service";
import {Router} from "@angular/router";
import {AppEventBroadcaster} from "../../app-events/app-event-broadcaster";
import {AppEvent} from "../../app-events/app-event";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  @ViewChild('productsElem') productsElem!: ElementRef
  formGroup: FormGroup = this.fb.group({
    'search': ['']
  });
  products: Product[] = []
  searchFor: string = ""
  configModel: ConfigModel | null = null


  constructor(
    private fb: FormBuilder,
    private productsApi: ProductsApi,
    private configService: ConfigModelService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.configService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
    this.formGroup.get('search')!.valueChanges.subscribe(response => {
      this.searchFor = response
      this.productsApi.searchProducts(1, {name: this.searchFor})
        .pipe(throttleTime(2000))
        .subscribe({
          next: (productModel) => {
            this.products = productModel.products ?? []
          }
        })
    });
    AppEventBroadcaster.on({event: AppEvent.hideSearchBarResult}).subscribe({
      next: (_) => {
        if (this.products.isNotEmpty()) {
          this.products = []
        }
      }
    })
  }

  getImage(image: string) {
    return `${this.configModel?.baseUrls?.productImageUrl}/${image}`
  }

  openDetails(product: Product) {
    this.router.navigate(['/product', product.id]).then()
    this.productsElem.nativeElement.classList.add('hide')
  }

  openAllProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        name: this.searchFor.trim()
      }
    }).then()
    this.productsElem.nativeElement.classList.add('hide')
  }
}
