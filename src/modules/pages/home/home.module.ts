import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {TaskModule} from "./task/task.module";
import {HeaderComponent} from "../../core/components/header/header.component";
import {RouterLink} from "@angular/router";
import {MaterialModule} from "../../../app/material.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TaskModule,
    RouterLink,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent
  ],
})
export class HomeModule { }
