import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedLayoutComponent} from '../shared/shared-layout/shared-layout.component';
import {UsersListPageComponent} from './users-list-page/users-list-page.component';
import {CourseAddPageComponent} from './course-add-page/course-add-page.component';
import {CourseEditPageComponent} from './course-edit-page/course-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersListPageComponent
      },
      {
        path: 'course',
        component: CourseAddPageComponent
      },
      {
        path: 'course/:id',
        component: CourseEditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
