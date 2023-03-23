import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ToastEventsModel} from "../models/toast-events.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  _toastEvents: BehaviorSubject<ToastEventsModel[]> = new BehaviorSubject<ToastEventsModel[]>([]);
  toastEvents$: Observable<ToastEventsModel[]> = this._toastEvents.asObservable();

  emitToastEvent(toastEventData: ToastEventsModel): void {
    this._toastEvents.next([...this._toastEvents.getValue(), toastEventData]);
  }
}
