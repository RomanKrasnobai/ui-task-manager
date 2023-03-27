import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of, takeUntil} from "rxjs";
import {UserService} from "../../core/services/user.service";
import {User} from "../../shared/models/user.model";
import {DestroyService} from "../../shared/services/destroy.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [DestroyService],
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user$: Observable<User>;
  userAvatar$: Observable<string> = this.userService.avatarUrl$;

  constructor(
    @Inject(DestroyService) private destroy$: Observable<void>,
    private route: ActivatedRoute,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.user$ = this.route.params
      .pipe(
        catchError(err => of(err)),
        map((params: any) => params),
        takeUntil(this.destroy$),
      );
  }
}
