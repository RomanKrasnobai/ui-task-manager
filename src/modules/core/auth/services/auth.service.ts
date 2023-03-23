import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {AuthDataModel} from "../models/auth-data.model";
import {Router} from "@angular/router";
import {UserModel} from "../../../shared/models/user.model";
import {Constants} from "../../../shared/constants";
import {UserService} from "../../services/user.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService
  ) { }

  login(data: AuthDataModel): Observable<void> {
    return this.http.post<UserModel>('/api/users/login', data)
      .pipe(
        map(user => {
          localStorage.setItem(Constants.AUTH_USER_KEY, JSON.stringify(user.token));
          localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(user));
          this.router.navigate(['/home']);
          console.log(user);
        })
      )
  }

  logOut() {
    return this.http.post('/api/users/logout', {})
      .pipe(
        tap(() => {
          localStorage.removeItem(Constants.AUTH_USER_KEY)
          localStorage.removeItem(Constants.CURRENT_USER)
          this.userService.currentUserToken = ''
        })
      );
  }
}
