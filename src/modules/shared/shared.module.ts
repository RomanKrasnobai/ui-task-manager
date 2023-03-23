import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectMenuComponent} from "./components/select-menu/select-menu.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {MaterialModule} from "../../app/material.module";
import { ToastComponent } from './components/toast/toast.component';
import { TextAreaComponent } from './components/text-area/text-area.component';



@NgModule({
  declarations: [
    SelectMenuComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    TextAreaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SelectMenuComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    TextAreaComponent
  ]
})
export class SharedModule { }
