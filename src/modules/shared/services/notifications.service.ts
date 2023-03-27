import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  _notifications: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  notifications$: Observable<string[]> = this._notifications.asObservable();

  notificationSign$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  emitNewNotification(notification: string) {
    this._notifications.next(
      [...this._notifications.getValue(), notification]
    );
  }
}
