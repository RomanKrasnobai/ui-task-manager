import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Self
} from '@angular/core';
import {catchError, map, Observable, of, takeUntil, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TasksModel} from "../../../shared/models/tasks.model";
import {TasksService} from "../../../core/services/tasks.service";
import {ActivatedRoute} from "@angular/router";
import {AddNewTaskComponentDialog} from "./add-new-task-dialog/add-new-task-dialog.component";
import {AddTaskModel} from "../../../shared/models/add-task.model";
import {NotificationsService} from "../../../shared/services/notifications.service";
import {DestroyService} from "../../../shared/services/destroy.service";
import {ToastService} from "../../../shared/services/toast.service";
import {ToastEventsType} from "../../../shared/models/toast-events.model";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks$: Observable<TasksModel[]>;

  editedTasks: TasksModel[];

  isSaved: boolean = false;

  index: number | null;

  constructor(
    @Self()
    @Inject(DestroyService) private destroy$: Observable<void>,
    private tasksService: TasksService,
    private notificationsService: NotificationsService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.route.data
      .pipe(
        catchError(err => of(err)),
        map(tasks => this.editedTasks = tasks.tasks),
      )
  }

  ngOnDestroy(): void {
    this.editedTasks = [];
  }

  // @HostListener('window:beforeunload', ['$event'])
  // public onBeforeUnload(event: BeforeUnloadEvent): void {
  //   this.isAllowedNavigation(true).subscribe(isAllowedNavigation => {
  //     if (event && !isAllowedNavigation) {
  //       event.preventDefault();
  //       event.returnValue = false;
  //     }
  //   });
  // }

  canDeactivate(): Observable<boolean> {
    return this.isAllowedNavigation();
  }

  editTask(task: TasksModel, index: number): void {
    this.index = index;
  }

  saveEditTask(task: { id: string, form: TasksModel }): void {
    this.tasksService.editTask(task.id, task.form)
      .pipe(
        catchError(err => of(err)),
        takeUntil(this.destroy$)
      )
      .subscribe((res: TasksModel) => {
        this.editedTasks = this.editedTasks.map(el => {
          if (el._id === res._id) {
            // Object.assign(el, res);
            el = { ...res };
          }
          return el;
        });
        this.tasks$ = of(this.editedTasks);
        this.isSaved = true;

        this.notificationsService._notifications.next(
          [...this.notificationsService._notifications.getValue(), `"${task.form.description}" - was edited`]
        );

        this.toastService.emitToastEvent(
          {
                title: 'Task edit',
                message: 'Task was successfully edited',
                type: ToastEventsType.SUCCESS
            }
        );

        this.notificationsService.notificationSign$.next(true);
        this.cd.markForCheck();
      });

    this.index = null;
  }

  createNewTask(): void {
    this.dialog.open(AddNewTaskComponentDialog)
      .afterClosed()
      .pipe(
        catchError(err => of(err)),
        tap((data: AddTaskModel) => {
          if (data) {
            this.savingNewTaskReq(data);
          }
        }),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  removeTask(task: TasksModel): void {
    const index = this.editedTasks.findIndex(taskEle => taskEle._id === task._id);
    if (index > -1) {
      this.editedTasks.splice(index, 1);
      this.tasksService.removeTask(task._id)
        .pipe(
          catchError(err => of(err)),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.notificationsService._notifications.next(
            [...this.notificationsService._notifications.getValue(), `"${task.description}" - was removed`]
          );

          this.toastService.emitToastEvent(
            {
              title: 'Task removed',
              message: 'Task was successfully removed',
              type: ToastEventsType.SUCCESS
            }
          );

          this.notificationsService.notificationSign$.next(true);
          this.cd.markForCheck();
        });
    }
  }

  cancelSaving(event: boolean) {
    this.index = null;
  }

  private savingNewTaskReq(data: AddTaskModel) {
    this.tasksService.addNewTask(data)
      .pipe(
        catchError(err => of(err)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (newTask: TasksModel) => {
          if (newTask) {
            this.editedTasks.push(newTask);
            this.isSaved = true;

            this.notificationsService._notifications.next(
              [...this.notificationsService._notifications.getValue(), `"${data.description}" - was created`]
            );

            this.toastService.emitToastEvent(
              {
                title: 'Task creation',
                message: 'Task was successfully created',
                type: ToastEventsType.SUCCESS
              }
            );

            this.notificationsService.notificationSign$.next(true);
            this.cd.markForCheck();
          }
        })
  }

  private isAllowedNavigation(beforeunloadEvent = false): Observable<boolean> {
    if (!this.isSaved || beforeunloadEvent) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }
    return of(true);
  }
}
