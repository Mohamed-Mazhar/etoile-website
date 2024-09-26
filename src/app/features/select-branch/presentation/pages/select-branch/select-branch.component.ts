import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {Branch} from "../../../../../common/data-classes/ConfigModel";
import {SELECTED_BRANCH, USER_INFO} from "../../../../../common/utils/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss']
})
export class SelectBranchComponent implements OnInit {

  selectedBranch: Branch | null = null
  searchText: string = ""
  form: FormGroup = this.fb.group({
    'search': ['']
  })
  branches: Branch[] = []
  filteredBranches: Branch[] = []

  constructor(
    private fb: FormBuilder,
    private configModelService: ConfigModelService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form.get('search')?.valueChanges.subscribe(text => {
      this.searchText = text
      if (!this.searchText.hasActualValue()) {
        this.filteredBranches = this.branches
      } else {
        this.filteredBranches = this.branches.filter((branch) => {
          return branch.name?.includes(this.searchText)
        })
      }
    })
    this.configModelService.configModelSubject.subscribe({
      next: (response) => {
        this.branches = response?.branches ?? []
        this.filteredBranches = this.branches
      }
    })
  }

  setBranch(branch: Branch) {
    this.selectedBranch = branch
  }

  goToHome() {
    if (this.selectedBranch !== null) {
      localStorage.setItem(SELECTED_BRANCH, JSON.stringify(this.selectedBranch))
      this.router.navigate(['/']).then()
    }
  }

}
