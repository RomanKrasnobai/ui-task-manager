import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskFormModel} from "../../../../shared/models/task-form.model";

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AddNewTaskComponentDialog {
  createTaskForm: FormGroup = new FormGroup<TaskFormModel>({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150),
    ]),
    completed: new FormControl(false)
  })

  constructor(
    private dialogRef: MatDialogRef<any>,
  ) { }

  close() {
    this.dialogRef.close();
  }

  createNewTask(): void {
    this.dialogRef.close(this.createTaskForm.value);
  }
}
