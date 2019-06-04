import {Component, OnInit} from '@angular/core';
import {CourseFormType} from '../course-form/course-form-type.enum';
import {CoursesStoreService} from '../../core/courses/courses-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../core/courses/course.interface';

@Component({
  selector: 'app-course-edit-page',
  templateUrl: './course-edit-page.component.html',
  styleUrls: ['./course-edit-page.component.scss']
})
export class CourseEditPageComponent implements OnInit {
  CourseFormType = CourseFormType;
  course: Course;

  constructor(private courseStoreService: CoursesStoreService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.courseStoreService.getCourseById(this.route.snapshot.params.id).subscribe(course => {
      this.course = course;
    }, () => {
      this.router.navigate(['/courses']);
    });
  }

  onSubmit(course: Partial<Course>) {
    this.courseStoreService.editCourse(Object.assign(this.course, course)).subscribe(() => {
      this.router.navigate(['/courses/details/', this.course.guid]);
    });
  }

  onDeleteCourse(courseId: string) {
    this.courseStoreService.deleteCourse(courseId).subscribe(() => this.router.navigate(['/courses']));
  }

}
