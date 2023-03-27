import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TasksModel} from "../../../../shared/models/tasks.model";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  index: number | null;

  @Input() task: TasksModel;
  @Input() i: number;

  @Output() savedTaskAfterEdition: EventEmitter<{ id: string, form: TasksModel }> =
    new EventEmitter<{ id: string, form: TasksModel }>();

  @Output() removedTask: EventEmitter<any> = new EventEmitter<any>();

  cancelSaving(): void {
    this.index = null;
  }

  saveEditionTask(task: { id: string, form: TasksModel }): void {
    this.savedTaskAfterEdition.emit(task);
    this.index = null;
  }

  editTask(index: number): void {
    this.index = index;
  }

  removeTask(task: TasksModel): void {
    this.removedTask.emit(task);
  }
}
