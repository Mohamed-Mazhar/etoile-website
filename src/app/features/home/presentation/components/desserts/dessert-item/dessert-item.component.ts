import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dessert-item',
  templateUrl: './dessert-item.component.html',
  styleUrls: ['./dessert-item.component.scss']
})
export class DessertItemComponent implements OnInit {

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() image: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openProductDetails() {
    this.router.navigate(['/product', 123]).then()
  }

}
