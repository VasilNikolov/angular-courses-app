import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Course} from '../../core/courses/course.interface';
import {CourseFormType} from './course-form-type.enum';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @Output()
  courseForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    image: [null, Validators.required],
  });

  @Input()
  set formData(course: Course) {
    this.courseForm.reset(course);
    this.course = course;
  }

  @Input()
  type = CourseFormType.CREATE;

  @Output()
  successSubmit: EventEmitter<Partial<Course>> = new EventEmitter<Partial<Course>>();

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  CourseFormType = CourseFormType;
  course: Course;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.courseForm.valid) {
      return;
    }
    this.successSubmit.emit(this.courseForm.value);
  }

  onDeleteCourse(courseId: string) {
    this.delete.emit(courseId);
  }

}
