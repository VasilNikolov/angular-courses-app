import {Injectable, OnDestroy} from '@angular/core';
import {UsersStoreService} from './users-store.service';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {User} from './user.interface';
import {distinctUntilChanged, filter, skip, switchMap, switchMapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnDestroy {
  private sessionKey = 'userId';
  private hasSession: BehaviorSubject<boolean> = new BehaviorSubject(!!this.getSessionId());
  hasSession$: Observable<boolean> = this.hasSession.asObservable();
  private userSession: BehaviorSubject<User> = new BehaviorSubject(undefined);
  userSession$: Observable<User> = this.userSession.asObservable();
  private sessionSubscription: Subscription = this.getUserOnSessionChange().subscribe();

  constructor(private userStoreService: UsersStoreService) {
  }

  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
  }

  setSessionId(userId: string) {
    localStorage.setItem(this.sessionKey, userId);
    this.hasSession.next(true);
  }

  private getSessionId(): string {
    return localStorage.getItem(this.sessionKey);
  }

  removeSession(): void {
    localStorage.removeItem(this.sessionKey);
    this.hasSession.next(false);
    this.userSession.next(undefined);
    this.removeUserSession();
  }


  private setUserSession(user: User) {
    this.userSession.next(user);
  }

  private removeUserSession() {
    this.userSession.next(undefined);
  }

  getUserOnSessionChange() {
    return this.hasSession$
      .pipe(
        filter(s => !!s),
        switchMap(() => this.userStoreService.getUserById(this.getSessionId())),
        tap(user => this.setUserSession(user)));
  }
}
