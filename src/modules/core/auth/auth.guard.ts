import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Constants} from "../../shared/constants";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(Constants.AUTH_USER_KEY)) {
      // @ts-ignore
      this.userService.currentUserToken = localStorage.getItem(Constants.AUTH_USER_KEY);
      JSON.stringify(localStorage.getItem(Constants.CURRENT_USER));

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
