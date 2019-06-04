import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {UsersListPageComponent} from './users-list-page/users-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {CourseFormComponent} from './course-form/course-form.component';
import {CourseAddPageComponent} from './course-add-page/course-add-page.component';
import {CourseEditPageComponent} from './course-edit-page/course-edit-page.component';

@NgModule({
  declarations: [UsersListPageComponent, CourseFormComponent, CourseAddPageComponent, CourseEditPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
