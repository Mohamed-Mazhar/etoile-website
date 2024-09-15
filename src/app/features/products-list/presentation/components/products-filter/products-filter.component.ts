import {Component, HostListener, OnInit} from '@angular/core';
import {LabelType} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {

  isMobileView: boolean = false

  categories = [
    {
      id: 1,
      name: "Gateau"
    },
    {
      id: 2,
      name: "Super"
    }
  ]

  size = [
    {
      id: 22,
      name: "Kilo"
    },
    {
      id: 23,
      name: "Piece"
    },
    {
      id: 24,
      name: "1/2 kilo"
    },
    {
      id: 27,
      name: "Mix box"
    },
    {
      id: 26,
      name: "2 kilo"
    },
    {
      id: 34,
      name: "4/2 kilo"
    }
  ]

  minPrice: number = 20
  maxPrice: number = 1000
  options: any = {
    floor: 20,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' <b>EGP</b>';
        case LabelType.High:
          return value + ' <b>EGP</b>';
        default:
          return '$' + value;
      }
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {
      this.isMobileView = true
    }
  }

  clear() {

  }

  format(value: number): string {
    return (value / 100).toString()
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.isMobileView = window.innerWidth < 770 && window.innerHeight < 1020;
  }

}
