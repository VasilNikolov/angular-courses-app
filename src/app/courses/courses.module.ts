import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesListPageComponent} from './courses-list-page/courses-list-page.component';
import {SharedModule} from '../shared/shared.module';
import {CourseItemComponent} from './course-item/course-item.component';
import {RatingPipe} from './course-page/rating.pipe';
import {CoursePageComponent} from './course-page/course-page.component';

@NgModule({
  declarations: [CoursesListPageComponent, CourseItemComponent, RatingPipe, CoursePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule {
}
