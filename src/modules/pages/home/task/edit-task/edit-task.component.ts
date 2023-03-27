import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksModel} from "../../../../shared/models/tasks.model";
import {map} from "rxjs";
import {TaskFormModel} from "../../../../shared/models/task-form.model";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup = new FormGroup<TaskFormModel>({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150),
    ]),
    completed: new FormControl(false)
  });

  @Input() task: TasksModel;

  @Output() emitSavingTask: EventEmitter<{ id: string, form: TasksModel }> =
    new EventEmitter<{ id: string, form: TasksModel }>();

  @Output() emitCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.taskForm.get('description')?.setValue(this.task.description);
    this.taskForm.get('completed')?.setValue(this.task.completed);
  }

  saveTask(): void {
    this.taskForm.valueChanges.pipe(
      map(value => this.taskForm.setValue(value))
    );

    this.emitSavingTask.emit({ id: this.task._id, form: this.taskForm.value });
  }

  cancel(): void {
    this.emitCancel.emit(true)
  }
}
