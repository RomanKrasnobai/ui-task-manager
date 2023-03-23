import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../../../core/services/user.service";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<UserModel> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
    return this.userService.getUser();
  }
}
