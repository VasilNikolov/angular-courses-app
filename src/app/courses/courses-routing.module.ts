import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedLayoutComponent} from '../shared/shared-layout/shared-layout.component';
import {CoursesListPageComponent} from './courses-list-page/courses-list-page.component';
import {CoursePageComponent} from './course-page/course-page.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      {
        path: '',
        component: CoursesListPageComponent
      },
      {
        path: 'details/:id',
        component: CoursePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
