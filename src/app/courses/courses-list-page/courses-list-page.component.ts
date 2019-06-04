import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoursesStoreService} from '../../core/courses/courses-store.service';
import {Course} from '../../core/courses/course.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list-page.component.html',
  styleUrls: ['./courses-list-page.component.scss']
})
export class CoursesListPageComponent implements OnInit, OnDestroy {
  courses: Course[];
  coursesSubscription: Subscription;

  constructor(private coursesStoreService: CoursesStoreService) {
  }

  ngOnInit() {
    this.coursesSubscription = this.coursesStoreService.courses$.subscribe(courses => this.courses = courses);
  }

  ngOnDestroy() {
    this.coursesSubscription && this.coursesSubscription.unsubscribe();
  }
}
