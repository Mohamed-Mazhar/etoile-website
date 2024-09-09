import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./features/home/presentation/home-page.component";
import {MainPageComponent} from "./features/home/presentation/pages/main-page/main-page.component";
import {AboutUsComponent} from "./features/home/presentation/pages/about-us/about-us.component";
import {
  DeliveryReturnPolicyComponent
} from "./features/home/presentation/pages/delivery-return-policy/delivery-return-policy.component";
import {
  TermsAndConditionsComponent
} from "./features/home/presentation/pages/terms-and-conditions/terms-and-conditions.component";
import {PrivacyComponent} from "./features/home/presentation/pages/privacy/privacy.component";
import {SelectBranchComponent} from "./features/select-branch/presentation/pages/select-branch/select-branch.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {path: '', component: MainPageComponent},
      {path: 'about', component: AboutUsComponent},
      {path: 'delivery-return-policy', component: DeliveryReturnPolicyComponent},
      {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
      {path: 'privacy', component: PrivacyComponent}
    ]
  },
  {path: 'zone', component: SelectBranchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
