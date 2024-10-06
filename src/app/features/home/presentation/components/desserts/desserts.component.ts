import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product, ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  @Input() productModel: ProductModel | null = null
  @Input() titleSection: string = '';
  @Input() imageSection: string = '';
  @Input() direction: string = 'left';
  // @ViewChild('scrollList') scrollList!: ElementRef;


  configModel: ConfigModel | null = null
  atStart = true;
  atEnd = false;
  chunkSize = 2

  constructor(
    private configService: ConfigModelService,
    private cartService: CartProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.chunkSize = 1
    }
    this.configService.configModelSubject.subscribe({
      next: (config) => {
        this.configModel = config
      }
    })
  }

  ngAfterViewInit() {
    this.checkScrollPosition();
  }

  scrollLeft() {
    // const scrollAmount = this.scrollList.nativeElement.clientWidth / 3;
    // this.scrollList.nativeElement.scrollBy({
    //   left: -scrollAmount,
    //   behavior: 'smooth'
    // });
    setTimeout(() => this.checkScrollPosition(), 300); // Delay to allow smooth scroll to complete
  }

  scrollRight() {
    // const scrollAmount = this.scrollList.nativeElement.clientWidth / 3;
    // this.scrollList.nativeElement.scrollBy({
    //   left: scrollAmount,
    //   behavior: 'smooth'
    // });
    setTimeout(() => this.checkScrollPosition(), 300);
  }

  checkScrollPosition() {
    // const scrollLeft = this.scrollList.nativeElement.scrollLeft;
    // const scrollWidth = this.scrollList.nativeElement.scrollWidth;
    // const clientWidth = this.scrollList.nativeElement.clientWidth;
    //
    // // Check if we're at the start or end of the scroll
    // this.atStart = scrollLeft === 0;
    // this.atEnd = scrollLeft + clientWidth >= scrollWidth;
  }

  isLeft():boolean{
    return this.direction == "left"
  }

  addProduct(product: Product) {
    this.cartService.addProduct({
      product: product,
      count: 1,
      productAddOns: []
    })
  }

  showProductDetails(product: Product) {
    this.router.navigate(['/product', product.id!]).then()
  }

  getImage(productImage: string | undefined) {
    return `${this.configModel?.baseUrls?.productImageUrl}/${productImage}`
  }


  chunkArray(arr: any[], chunkSize: number): Product[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.chunkSize = window.innerWidth < 770 && window.innerHeight < 1020 ? 1 : 2;
  }

}
