import {NgModule} from "@angular/core";
import {UserProfileComponent} from "./user-profile.component";
import {CommonModule} from "@angular/common";
import {UserProfileRoutingModule} from "./user-profile.routing.module";
import {HomeModule} from "../../../pages/home/home.module";

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    HomeModule,
  ]
})
export class UserProfileModule {}
