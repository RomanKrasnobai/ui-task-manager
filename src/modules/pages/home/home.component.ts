import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "../../shared/models/user.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  userData$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userData$ = this.route.data
      .pipe(
        catchError(err => of(err)),
        map((data: any) => data.userProfile),
      );
  }
}
