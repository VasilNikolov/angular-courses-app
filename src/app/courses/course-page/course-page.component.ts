import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesStoreService} from '../../core/courses/courses-store.service';
import {Course} from '../../core/courses/course.interface';
import {User} from '../../core/users/user.interface';
import {SessionService} from '../../core/users/session.service';
import {combineLatest, merge, NEVER, of, Subscription} from 'rxjs';
import {Role} from '../../core/users/roles.enum';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  course: Course;
  maxCourseRate = new Array(5);
  userSession: User;
  subscription: Subscription;
  Role = Role;

  get isCourseJoined() {
    if (!this.userSession) {
      return false;
    }
    return this.course.joinedUsers.includes(this.userSession.guid);
  }

  get userHasRated() {
    return this.course.rating.some(rate => rate.userId === this.userSession.guid);
  }

  constructor(private route: ActivatedRoute,
              private courseStoreService: CoursesStoreService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = combineLatest(
      merge(of(undefined), this.sessionService.userSession$),
      this.courseStoreService.getCourseById(this.route.snapshot.params.id)).pipe(catchError(() => {
      this.router.navigate(['/courses']);
      return NEVER;
    }))
      .subscribe(([userSession, course]) => {
        this.userSession = userSession;
        this.course = course;
      });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  onJoinCourse() {
    this.courseStoreService.joinCourse(this.userSession.guid, this.course.guid).subscribe();
  }

  onRateCourse(rating: number) {
    this.courseStoreService.rateCourse(rating, this.userSession.guid, this.course.guid).subscribe();
  }

  onDeleteCourse(courseId: string) {
    this.courseStoreService.deleteCourse(courseId).subscribe(() => this.router.navigate(['/courses']));
  }
}
