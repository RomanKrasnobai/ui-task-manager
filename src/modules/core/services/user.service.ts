import { Injectable } from '@angular/core';
import {Observable, shareReplay, Subject, tap} from "rxjs";
import {UserModel} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _avatarUrl: Subject<string> = new Subject<string>();
  avatarUrl$: Observable<string> = this._avatarUrl as Observable<string>;

  currentUserToken: string = '';

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>('/api/users/me')
      .pipe(
        shareReplay(1)
      )
  }

  getUserAvatar(id: string): Observable<any> {
    const url = `/api/users/${id}/avatar`;

    return this.http.get(url, { responseType: 'blob'})
      .pipe(
        tap(() => this._avatarUrl.next(url)),
        shareReplay(1)
      )
  }
}
