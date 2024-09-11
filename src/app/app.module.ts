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
import { SelectBranchHeaderComponent } from './features/select-branch/presentation/pages/select-branch/components/select-branch-header/select-branch-header.component';
import { SelectBranchFooterComponent } from './features/select-branch/presentation/pages/select-branch/components/select-branch-footer/select-branch-footer.component';
import { ProductComponent } from './common/components/product/product.component';
import { ProductsComponent } from './features/products-list/presentation/pages/products/products.component';
import { ProductsFilterComponent } from './features/products-list/presentation/pages/products/components/products-filter/products-filter.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";


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
    ProductComponent,
    ProductsComponent,
    ProductsFilterComponent,
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
