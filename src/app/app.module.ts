import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './features/home/presentation/home/home-page.component';
import {SearchBarComponent} from './common/components/search-bar/search-bar.component';
import {UserInfoComponent} from './common/components/user-info/user-info.component';
import {CategoriesComponent} from './common/components/categories/categories.component';
import {
  MainProductsCarouselComponent
} from './features/home/presentation/home/components/main-products-carousel/main-products-carousel.component';
import {FooterComponent} from './common/components/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './common/components/header/header.component';
import {MainPageComponent} from './features/home/presentation/home/pages/main-page/main-page.component';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from "@angular/common/http";


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
    MainPageComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
