import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../../shared/models/user.model";
import {BehaviorSubject, Observable, switchMap, takeUntil} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {NotificationsService} from "../../../shared/services/notifications.service";
import {DestroyService} from "../../../shared/services/destroy.service";
import {SelectMenuComponent} from "../../../shared/components/select-menu/select-menu.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  userAvatar$: Observable<string> = this.userService.avatarUrl$;
  notifications$: Observable<string[]> = this.notificationsService.notifications$;
  notificationSign$: BehaviorSubject<boolean> = this.notificationsService.notificationSign$;

  @Input() userData$: Observable<User>;

  @ViewChild('notificationsList', { static: false }) selectMenuComponent: SelectMenuComponent;

  constructor(
    @Inject(DestroyService) private destroy$: Observable<void>,
    private authService: AuthService,
    private userService: UserService,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.userData$
      .pipe(
        switchMap((user: User) => this.userService.getUserAvatar(user._id)),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  openMenu(): void {
    this.selectMenuComponent.show();
    this.notificationsService.notificationSign$.next(false);
  }

  logOut(): void {
    this.authService.logOut();
  }
}
