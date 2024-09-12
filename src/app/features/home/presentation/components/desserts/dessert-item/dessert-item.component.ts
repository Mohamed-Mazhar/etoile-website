import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dessert-item',
  templateUrl: './dessert-item.component.html',
  styleUrls: ['./dessert-item.component.scss']
})
export class DessertItemComponent implements OnInit {

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() image: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
