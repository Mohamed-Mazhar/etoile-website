import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './features/home/presentation/home-page/home-page.component';
import { SearchBarComponent } from './common/components/search-bar/search-bar.component';
import { UserInfoComponent } from './features/home/presentation/home-page/components/user-info/user-info.component';
import { CategoriesComponent } from './features/home/presentation/home-page/components/categories/categories.component';
import { MainProductsCarouselComponent } from './features/home/presentation/home-page/components/main-products-carousel/main-products-carousel.component';
import { FooterComponent } from './common/components/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchBarComponent,
    UserInfoComponent,
    CategoriesComponent,
    MainProductsCarouselComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
