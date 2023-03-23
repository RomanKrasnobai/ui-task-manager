import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Self} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {delay, map, Observable, takeUntil, tap} from "rxjs";
import {ToastEventsModel, ToastEventsType} from "../../models/toast-events.model";
import {DestroyService} from "../../services/destroy.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {
  toastEvents$: Observable<ToastEventsModel[]> = this.toastService.toastEvents$;

  toastEventsType = ToastEventsType;

  constructor(
    @Self()
    @Inject(DestroyService) private destroy$: Observable<void>,
    private toastService: ToastService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.toastService.toastEvents$
      .pipe(
        map(items => {
          if (items.length) {
            this.hideEventsTimeout();
          }
        })
      ).subscribe();
  }

  hideEventsTimeout(): void {
    new Observable(observer => {
      observer.next(null);
      observer.complete();
    }).pipe(
      delay(4000),
      tap(() => {
        this.toastService._toastEvents.next([]);
        this.cd.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  removeEvent(index: number) {
    this.toastService.toastEvents$
      .pipe(
        map(items => items.splice(index, 1)),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
