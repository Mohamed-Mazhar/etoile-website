import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {ConfigModelService} from "../../../../../common/services/config-model.service";
import {Branch} from "../../../../../common/data-classes/ConfigModel";
import {SELECTED_BRANCH} from "../../../../../common/utils/constants";
import {Router} from "@angular/router";
import {CartProductsService} from "../../../../../common/services/cart-products.service";
import {AnalyticsService} from "../../../../analytics/data/services/analytics-service";
import {AnalyticsEvent} from "../../../../analytics/data/models/AnalyticsEvent";

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss']
})
export class SelectBranchComponent implements OnInit {

  selectedBranch: Branch | null = null
  searchText: string = ""
  form: UntypedFormGroup = this.fb.group({
    'search': ['']
  })
  branches: Branch[] = []
  filteredBranches: Branch[] = []

  constructor(
    private fb: UntypedFormBuilder,
    private configModelService: ConfigModelService,
    private cartService: CartProductsService,
    private router: Router,
    private analyticsService: AnalyticsService
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
    let oldBranchExists = localStorage.getItem(SELECTED_BRANCH) !== null
    this.analyticsService.logEvent({
      event: oldBranchExists ? AnalyticsEvent.storeChange : AnalyticsEvent.storeSelected,
      parameters: new Map<string, any>([
        [oldBranchExists ? 'new_store_id' : 'store_id', this.selectedBranch?.id]
      ])
    })
    if (this.selectedBranch !== null) {
      localStorage.setItem(SELECTED_BRANCH, JSON.stringify(this.selectedBranch))
      this.cartService.clearCart()
      this.router.navigate(['/']).then()
    }
  }

}
