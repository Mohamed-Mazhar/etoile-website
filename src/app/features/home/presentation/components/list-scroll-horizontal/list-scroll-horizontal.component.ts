import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProductModel} from "../../../../../common/data-classes/ProductModel";

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
  private scrollInterval: any;

  constructor() {
  }

  //
  ngOnInit(): void {
  }

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

}
