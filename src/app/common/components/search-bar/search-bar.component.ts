import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() width: number = 15

  constructor() { }

  ngOnInit(): void {
  }

  getWidth() {
    return `${this.width}rem`
  }

}
