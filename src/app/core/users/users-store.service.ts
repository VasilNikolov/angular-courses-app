import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import usersList from '../../../db/users.json';
import {map, tap} from 'rxjs/operators';
import {User} from './user.interface';
import {Guid} from 'guid-typescript';
import {Role} from './roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  static initializeProviders: Provider[] = [
    UsersStoreService,
    {
      provide: APP_INITIALIZER,
      useFactory: UsersStoreService.courseStoreServiceFactory,
      deps: [UsersStoreService],
      multi: true
    }
  ];

  private users: User[];
  private usersStore = new BehaviorSubject<User[]>(undefined);
  users$: Observable<User[]> = this.usersStore.asObservable();

  static courseStoreServiceFactory(userService: UsersStoreService) {
    return () => userService.getAllUsers().toPromise().catch(() => true);
  }

  getAllUsers() {
    return of(usersList).pipe(map(users => this.users = users), tap(() => this.updateStore()));
  }

  private updateStore() {
    this.usersStore.next(this.users);
  }

  authenticate(user: Partial<User>) {
    const storedUser = this.users.find(u => u.email === user.email && u.password === user.password && !u.isBlocked);
    return storedUser ? of(storedUser) : throwError('Authentication failed');
  }

  getUserById(userId: string) {
    return of(this.users.find(user => user.guid === userId));
  }

  toggleBlockUserById(userId: string) {
    const user = this.users.find(usr => usr.guid === userId);
    if (!user) {
      return throwError('Invalid user id');
    }
    return of(true).pipe(tap(() => {
      user.isBlocked = !user.isBlocked;
      this.updateStore();
    }));
  }

  addUser(user: Partial<User>) {
    const storedUser = this.users.find(u => u.email === user.email);

    if (storedUser) {
      return throwError('User already exists');
    }

    const userModel: User = {
      guid: Guid.create().toString(),
      registered: new Date().toDateString(),
      role: Role.USER,
      isBlocked: false,
      email: user.email,
      password: user.password,
      name: user.name
    };

    return of(userModel).pipe(tap(() => {
      this.users.push(userModel);
      this.updateStore();
    }));
  }
}
