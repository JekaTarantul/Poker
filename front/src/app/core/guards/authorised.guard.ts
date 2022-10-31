import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AUTH_KEY} from "../../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthorisedGuard implements CanActivate {
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(AUTH_KEY);
    if (!token) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }

}
