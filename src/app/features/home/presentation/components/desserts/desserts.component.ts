import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent  {
  @Input() titleSection: string = '';
  @Input() imageSection: string = '';
  @Input() direction: string = 'left';

  // Input property to accept items from the parent component
  @Input() items: { title: string; subtitle: string; image: string }[] = [];


  @ViewChild('scrollList') scrollList!: ElementRef;

  atStart = true;
  atEnd = false;

  ngAfterViewInit() {
    this.checkScrollPosition();
  }

  scrollLeft() {
    const scrollAmount = this.scrollList.nativeElement.clientWidth / 3;
    this.scrollList.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(() => this.checkScrollPosition(), 300); // Delay to allow smooth scroll to complete
  }

  scrollRight() {
    const scrollAmount = this.scrollList.nativeElement.clientWidth / 3;
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

  isLeft():boolean{
    return this.direction == "left"
  }

}
