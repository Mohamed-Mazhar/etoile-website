import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./features/home/presentation/home/home-page.component";
import {MainPageComponent} from "./features/home/presentation/home/pages/main-page/main-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {path: '', component: MainPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
