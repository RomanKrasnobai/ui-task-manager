import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {TasksService} from "../../../core/services/tasks.service";
import {TasksModel} from "../../models/tasks.model";
import {LoadingService} from "../loading.service";

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<TasksModel[]> {
  constructor(private tasksService: TasksService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TasksModel[]> {
    return this.tasksService.getTasks();
  }
}
