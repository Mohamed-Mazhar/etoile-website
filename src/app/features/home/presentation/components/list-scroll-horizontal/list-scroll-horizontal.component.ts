import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product, ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-scroll-horizontal',
  templateUrl: './list-scroll-horizontal.component.html',
  styleUrls: ['./list-scroll-horizontal.component.scss']
})
export class ListScrollHorizontalComponent implements OnInit {

  @ViewChild('featuredItemsContainer') container!: ElementRef;

  // Input property to accept items from the parent component
  @Input() items!: ProductModel
  @Input() title: string = '';
  @Input() direction: 'left' | 'right' | undefined;
  configModel: ConfigModel | null = null
  private scrollInterval: any;

  constructor(
    private configModelService: ConfigModelService,
    private cartService: CartProductsService,
    private router: Router
  ) {
  }

  //
  ngOnInit(): void {
    this.configModelService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
  }

  // ngAfterViewInit(): void {
  //   this.startScrolling();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['direction'] && !changes['direction'].firstChange) {
      this.startScrolling();
    }
  }

  startScrolling(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
    if (this.direction == undefined) {
      return
    }
    const scrollStep = this.direction === 'right' ? 1 : -1;

    this.scrollInterval = setInterval(() => {
      const previousPosition = this.container.nativeElement.scrollLeft;
      this.container.nativeElement.scrollLeft += scrollStep;

      if (previousPosition === this.container.nativeElement.scrollLeft) {
        this.container.nativeElement.scrollLeft = this.direction === 'right' ? 0 : this.container.nativeElement.scrollWidth;
      }
    }, 50);
  }

  isLeft(): boolean {
    return this.direction == "left"
  }

  getImage(productImage: string | undefined) {
    return `${this.configModel?.baseUrls?.productImageUrl}/${productImage}`
  }

  addProduct(product: Product) {
    this.cartService.addProduct({
      product: product,
      count: 1,
      productAddOns: []
    })
  }

  openProductDetails(product: Product) {
    this.router.navigate(['/product', product.id]).then()
  }
}
