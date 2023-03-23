import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "../home.routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../../app/material.module";
import {TaskComponent} from "./task.component";
import {EditTaskComponent} from "./edit-task/edit-task.component";
import {AddNewTaskComponentDialog} from "./add-new-task-dialog/add-new-task-dialog.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    TaskComponent,
    EditTaskComponent,
    AddNewTaskComponentDialog
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [TaskComponent]
})
export class TaskModule {}
