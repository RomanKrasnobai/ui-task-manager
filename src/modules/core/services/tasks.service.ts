import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {TasksModel} from "../../shared/models/tasks.model";
import {AddTaskModel} from "../../shared/models/add-task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TasksModel[]> {
    return this.http.get<TasksModel[]>('/api/tasks')
      .pipe(
        shareReplay(1)
      )
  }

  addNewTask(task: AddTaskModel): Observable<TasksModel> {
    return this.http.post<TasksModel>('/api/tasks', task)
      .pipe(
        shareReplay(1)
      )
  }

  editTask(id: string, task: TasksModel): Observable<TasksModel> {
    return this.http.patch<TasksModel>(`/api/tasks/${id}`, task);
  }

  removeTask(id: string): Observable<any> {
    return this.http.delete(`/api/tasks/${id}`)
      .pipe(
        shareReplay(1)
      )
  }
}
