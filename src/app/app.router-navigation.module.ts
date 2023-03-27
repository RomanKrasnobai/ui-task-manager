import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../modules/core/auth/auth.guard";
import {TasksResolver} from "../modules/shared/services/resolvers/tasks.resolver";
import {UserProfileResolver} from "../modules/shared/services/resolvers/user-profile.resolver";
// import {LeaveTasksPageGuard} from "../modules/pages/home/services/leave-tasks-page.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('../modules/pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    // canDeactivate: [LeaveTasksPageGuard],
    resolve: {
      tasks: TasksResolver,
      userProfile: UserProfileResolver
    }
  },
  {
    path: 'login',
    loadChildren: () => import('../modules/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('../modules/pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRouterNavigationModule { }
