import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Product, ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";

@Component({
  selector: 'desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  @Input() products: Product[][] = []
  @Input() titleSection: string = ''
  @Input() imageSection: string = ''
  @Input() direction: string = 'left'
  @Input() productModel: ProductModel | null = null
  @ViewChild('scrollList') scrollList!: ElementRef;


  configModel: ConfigModel | null = null
  atStart = true;
  atEnd = false;
  scrollBy = 3

  constructor() {
  }

  ngOnInit(): void {
    this.scrollBy = window.innerWidth < 770 && window.innerHeight < 1020 ? 1 : 3;
  }

  scrollLeft() {
    const scrollAmount = this.scrollList.nativeElement.clientWidth / this.scrollBy;
    this.scrollList.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(() => this.checkScrollPosition(), 300); // Delay to allow smooth scroll to complete
  }

  scrollRight() {
    const scrollAmount = this.scrollList.nativeElement.clientWidth / this.scrollBy;
    this.scrollList.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(() => this.checkScrollPosition(), 300);
  }

  checkScrollPosition() {
    const scrollLeft = this.scrollList.nativeElement.scrollLeft;
    const scrollWidth = this.scrollList.nativeElement.scrollWidth;
    const clientWidth = this.scrollList.nativeElement.clientWidth;

    // Check if we're at the start or end of the scroll
    this.atStart = scrollLeft === 0;
    this.atEnd = scrollLeft + clientWidth >= scrollWidth;
  }

  isLeft(): boolean {
    return this.direction == "left"
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.scrollBy = window.innerWidth < 770 && window.innerHeight < 1020 ? 1 : 3;
  }

}
