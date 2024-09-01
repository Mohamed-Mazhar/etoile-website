import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    'search': ['']
  });

  products: string[] = []
  searchFor: string = ""

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.formGroup.get('search')!.valueChanges.subscribe(response => {
      this.searchFor = response
    });
  }

}
