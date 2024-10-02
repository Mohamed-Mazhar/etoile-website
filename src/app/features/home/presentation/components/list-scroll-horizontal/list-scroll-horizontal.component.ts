import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProductModel} from "../../../../../common/data-classes/ProductModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";

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
  configModel: ConfigModel | null = null

  constructor(
    private configModelService: ConfigModelService
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
}
