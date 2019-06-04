import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import coursesList from '../../../db/courses.json';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Course, Rating} from './course.interface';
import {map, tap} from 'rxjs/operators';
import {Guid} from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  static initializeProviders: Provider[] = [
    CoursesStoreService,
    {
      provide: APP_INITIALIZER,
      useFactory: CoursesStoreService.courseStoreServiceFactory,
      deps: [CoursesStoreService],
      multi: true
    }
  ];

  private courses: Course[];
  coursesStore = new BehaviorSubject<Course[]>(undefined);
  courses$: Observable<Course[]> = this.coursesStore.asObservable();

  static courseStoreServiceFactory(courseService: CoursesStoreService) {
    return () => courseService.getAllCourses().toPromise().catch(() => true);
  }

  getAllCourses() {
    return of(coursesList).pipe(map(courses => this.courses = courses), tap(() => this.updateStore()));
  }

  getCourseById(id: string) {
    const course = this.courses.find(c => c.guid === id);
    return course ? of(course) : throwError('Invalid course id');
  }

  editCourse(course: Course) {
    return of(Object.assign(this.courses[this.getCourseIndex(course.guid)], course)).pipe(tap(() => this.updateStore()));
  }

  addCourse(course: Partial<Course>) {
    const courseModel: Course = {
      guid: Guid.create().toString(),
      joinedUsers: [],
      rating: [],
      dateCreated: new Date().toDateString(),
      description: course.description,
      title: course.title,
      image: course.image
    };

    this.courses.push(courseModel);
    return of(courseModel).pipe(tap(() => this.updateStore()));
  }

  deleteCourse(courseId: string) {
    const courseIndex = this.getCourseIndex(courseId);
    if (typeof courseIndex !== 'number') {
      return throwError('Invalid courseId');
    }
    return of(this.courses.splice(this.getCourseIndex(courseId), 1)).pipe(tap(() => this.updateStore()));
  }

  rateCourse(rating: number, userId: string, courseId: string) {
    const ratedUsers = this.courses[this.getCourseIndex(courseId)].rating;

    if (ratedUsers.some(rate => rate.userId === userId)) {
      return throwError('Already rated course');
    }
    return of(true).pipe(tap(() => {
      ratedUsers.push({userId, rating} as Rating);
      this.updateStore();
    }));
  }

  joinCourse(userId: string, courseId: string) {
    const joinedUsers = this.courses[this.getCourseIndex(courseId)].joinedUsers;

    if (joinedUsers.includes(userId)) {
      return throwError('Already joined course');
    }

    return of(true).pipe(tap(() => {
      joinedUsers.push(userId);
      this.updateStore();
    }));
  }

  private getCourseIndex(courseId) {
    return this.courses.findIndex(item => item.guid === courseId);
  }

  private updateStore() {
    this.coursesStore.next(this.courses);
  }
}

