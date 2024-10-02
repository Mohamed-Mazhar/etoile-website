import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable, Subject} from 'rxjs';
import {CartProductsService} from "../services/cart-products.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(
    private cartProductService: CartProductsService,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cartProductService.cartProductsSubject.pipe(
      map((cartProducts) => {
        if (cartProducts.isEmpty()) {
          this.router.navigate(['']).then()
          return false
        } else {
          return true
        }
      })
    )
  }

}
