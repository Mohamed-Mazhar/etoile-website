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
import {ProductsComponent} from "./features/products/presentation/pages/products/products.component";
import {CartPageComponent} from "./features/cart/presentation/pages/cart-page/cart-page.component";
import {CheckOutComponent} from "./features/check-out/presentation/pages/check-out/check-out.component";
import {UserProfileComponent} from "./features/user-profile/presentation/pages/user-profile/user-profile.component";
import {AuthGuard} from "./common/guards/auth.guard";
import {
  ProductDetailsComponent
} from "./features/products/presentation/pages/product-details/product-details.component";
import {CheckoutGuard} from "./common/guards/checkout.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {path: '', component: MainPageComponent},
      {path: 'about', component: AboutUsComponent},
      {path: 'delivery-return-policy', component: DeliveryReturnPolicyComponent},
      {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
      {path: 'privacy', component: PrivacyComponent},
      {path: 'products/:category', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'checkout', component: CheckOutComponent, canActivate: [CheckoutGuard, AuthGuard]},
      {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'product/:id', component: ProductDetailsComponent}
    ]
  },
  {path: 'branch', component: SelectBranchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
