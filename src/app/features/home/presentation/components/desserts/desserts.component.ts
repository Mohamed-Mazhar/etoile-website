import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product, ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";

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

  constructor() {
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.chunkSize = 1
    }
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

  isLeft(): boolean {
    return this.direction == "left"
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
