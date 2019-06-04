import {Component} from '@angular/core';
import {CourseFormType} from '../course-form/course-form-type.enum';
import {CoursesStoreService} from '../../core/courses/courses-store.service';
import {Course} from '../../core/courses/course.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-add-page',
  templateUrl: './course-add-page.component.html',
  styleUrls: ['./course-add-page.component.scss']
})
export class CourseAddPageComponent {
  CourseFormType = CourseFormType;

  constructor(private courseStoreService: CoursesStoreService, private router: Router) {
  }


  onSubmit(course: Partial<Course>) {
    this.courseStoreService.addCourse(course).subscribe((response: Course) => {
      this.router.navigate(['/courses/details', response.guid]);
    });
  }
}
