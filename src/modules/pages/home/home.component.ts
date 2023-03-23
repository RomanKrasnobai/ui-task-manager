import {ChangeDetectionStrategy, Component, Inject, OnInit, Self} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of, takeUntil} from "rxjs";
import {User} from "../../shared/models/user.model";
import {DestroyService} from "../../shared/services/destroy.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  userData$: Observable<User>;

  constructor(
    @Self()
    @Inject(DestroyService) private destroy$: Observable<void>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userData$ = this.route.data
      .pipe(
        catchError(err => of(err)),
        map((data: any) => data.userProfile),
        takeUntil(this.destroy$),
      );
  }
}
