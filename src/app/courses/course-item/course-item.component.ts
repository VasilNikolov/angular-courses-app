import {Component, Input} from '@angular/core';
import {Course} from '../../core/courses/course.interface';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input()
  courseItem: Course;
}
