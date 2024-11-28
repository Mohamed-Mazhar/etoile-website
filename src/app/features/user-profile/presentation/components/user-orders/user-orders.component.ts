import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../../../common/data-classes/OrderModel";
import {Router} from "@angular/router";
import {ConfigModel} from "../../../../../common/data-classes/ConfigModel";
import {ConfigModelService} from "../../../../../common/services/config-model.service";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  @Input() orders: OrderModel[] = []
  configModel: ConfigModel | null = null
  constructor(
    private router: Router,
    private configModelService: ConfigModelService
  ) { }

  ngOnInit(): void {
    this.configModelService.configModelSubject.subscribe({
      next: (configModel) => {
        this.configModel = configModel
      }
    })
  }

  openDetails(id: number) {
    this.router.navigate(['/order'], {
      queryParams: {
        id: id
      }
    }).then()
  }
}
