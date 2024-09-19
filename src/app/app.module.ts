import './common/extensions/string-extensions';
import './common/extensions/array-extensions';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './features/home/presentation/home-page.component';
import {SearchBarComponent} from './common/components/search-bar/search-bar.component';
import {UserInfoComponent} from './common/components/user-info/user-info.component';
import {CategoriesComponent} from './common/components/categories/categories.component';
import {
  MainProductsCarouselComponent
} from './features/home/presentation/components/main-products-carousel/main-products-carousel.component';
import {FooterComponent} from './common/components/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './common/components/header/header.component';
import {MainPageComponent} from './features/home/presentation/pages/main-page/main-page.component';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AboutUsComponent } from './features/home/presentation/pages/about-us/about-us.component';
import { DeliveryReturnPolicyComponent } from './features/home/presentation/pages/delivery-return-policy/delivery-return-policy.component';
import { TermsAndConditionsComponent } from './features/home/presentation/pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyComponent } from './features/home/presentation/pages/privacy/privacy.component';
import { LoginComponent } from './features/registration-and-login/presentation/pages/login/login.component';
import { InputTextFieldComponent } from './common/components/inputs/input-text-field/input-text-field.component';
import { PrimaryButtonComponent } from './common/components/buttons/primary-button/primary-button.component';
import { RegistrationComponent } from './features/registration-and-login/presentation/pages/registration/registration.component';
import { SelectBranchComponent } from './features/select-branch/presentation/pages/select-branch/select-branch.component';
import { SelectBranchHeaderComponent } from './features/select-branch/presentation/components/select-branch-header/select-branch-header.component';
import { SelectBranchFooterComponent } from './features/select-branch/presentation/components/select-branch-footer/select-branch-footer.component';
import { DessertsComponent } from './features/home/presentation/components/desserts/desserts.component';
import { DessertItemComponent } from './features/home/presentation/components/desserts/dessert-item/dessert-item.component';

import { ScrollUpBtnComponent } from './features/home/presentation/components/scroll-up-btn/scroll-up-btn.component';
import { ProductComponent } from './common/components/product/product.component';
import { ProductsComponent } from './features/products-list/presentation/pages/products/products.component';
import { ProductsFilterComponent } from './features/products-list/presentation/components/products-filter/products-filter.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { CartSidePageComponent } from './features/cart/presentation/pages/cart-side-page/cart-side-page.component';
import { CartSideItemComponent } from './features/cart/presentation/components/cart-side-item/cart-side-item.component';
import { ListScrollHorizontalComponent } from './features/home/presentation/components/list-scroll-horizontal/list-scroll-horizontal.component';
import { ProductItemComponent } from './features/home/presentation/components/list-scroll-horizontal/product-item/product-item.component';
import { RemoveProductModalComponent } from './features/home/presentation/components/remove-product-modal/remove-product-modal.component';
import { CartPageComponent } from './features/cart/presentation/pages/cart-page/cart-page.component';
import { CartProductItemComponent } from './features/cart/presentation/components/cart-product-item/cart-product-item.component';
import { MobileNumberComponent } from "./common/components/inputs/mobile-number/mobile-number.component";
import { NumericOnlyDirective } from './common/components/inputs/directives/numeric-only.directive';
import { CheckOutComponent } from './features/check-out/presentation/pages/check-out/check-out.component';
import { CheckoutOrderSummaryComponent } from './features/check-out/presentation/components/checkout-order-summary/checkout-order-summary.component';
import { ShippingTabComponent } from './features/check-out/presentation/components/shipping-tab/shipping-tab.component';
import { PaymentsTabComponent } from './features/check-out/presentation/components/payments-tab/payments-tab.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchBarComponent,
    UserInfoComponent,
    CategoriesComponent,
    MainProductsCarouselComponent,
    FooterComponent,
    HeaderComponent,
    MainPageComponent,
    AboutUsComponent,
    DeliveryReturnPolicyComponent,
    TermsAndConditionsComponent,
    PrivacyComponent,
    LoginComponent,
    InputTextFieldComponent,
    PrimaryButtonComponent,
    RegistrationComponent,
    SelectBranchComponent,
    SelectBranchHeaderComponent,
    SelectBranchFooterComponent,
    DessertsComponent,
    DessertItemComponent,
    ScrollUpBtnComponent,
    ProductComponent,
    ProductsComponent,
    ProductsFilterComponent,
    CartSidePageComponent,
    CartSideItemComponent,
    ListScrollHorizontalComponent,
    ProductItemComponent,
    RemoveProductModalComponent,
    CartPageComponent,
    CartProductItemComponent,
    MobileNumberComponent,
    NumericOnlyDirective,
    CheckOutComponent,
    CheckoutOrderSummaryComponent,
    ShippingTabComponent,
    PaymentsTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
