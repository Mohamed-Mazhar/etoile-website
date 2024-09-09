import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss']
})
export class SelectBranchComponent implements OnInit {

  selectBranch: string = ""
  searchText: string = ""
  form: FormGroup = this.fb.group({
    'search': ['']
  })
  zones = ['Maadi', 'Nasr city', 'Korba', 'Faisal', 'Haram', 'Imbaba']

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.selectBranch = this.translate.instant('CHOOSE_ZONE_LABEL')
    this.form.get('search')?.valueChanges.subscribe(text => {
      this.searchText = text
    })
  }

  setBranch(name: string) {
    this.selectBranch = name
  }

  isDisabled(): string {
    return this.selectBranch !== 'Select branch' ? '' : 'disabled'
  }

}
