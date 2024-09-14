import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-scroll-horizontal',
  templateUrl: './list-scroll-horizontal.component.html',
  styleUrls: ['./list-scroll-horizontal.component.scss']
})
export class ListScrollHorizontalComponent implements OnInit {

  @ViewChild('featuredItemsContainer') container!: ElementRef;

  // Input property to accept items from the parent component
  @Input() items: { title: string; subtitle: string; image: string }[] = [];
  @Input() title: string = '';

  constructor() { }
  //
  ngOnInit(): void {
  }
  //
  // ngAfterViewInit(): void {
  //   let previousPosition = this.container.nativeElement.scrollLeft
  //   let currentPosition = this.container.nativeElement.scrollLeft
  //   setInterval(() => {
  //     previousPosition = this.container.nativeElement.scrollLeft
  //     this.container.nativeElement.scrollLeft += 1
  //     currentPosition = this.container.nativeElement.scrollLeft
  //     if (previousPosition === currentPosition) {
  //       this.container.nativeElement.scrollLeft = 0
  //     }
  //   }, 50);
  // }



  @Input() direction: 'left' | 'right' | undefined;

  private scrollInterval: any;

  ngAfterViewInit(): void {
    this.startScrolling();
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
    if(this.direction == undefined){
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

  isLeft():boolean{
    return this.direction == "left"
  }

}
