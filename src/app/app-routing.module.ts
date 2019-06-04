import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Role} from './core/users/roles.enum';
import {AdminGuard} from './admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/home'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AdminGuard],
    data: {
      userRole: Role.ADMIN
    }
  },
  {
    path: '**',
    redirectTo: 'auth/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
