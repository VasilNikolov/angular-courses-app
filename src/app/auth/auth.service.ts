import {Injectable} from '@angular/core';
import {UsersStoreService} from '../core/users/users-store.service';
import {User} from '../core/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userStoreService: UsersStoreService) {
  }

  login(user: Partial<User>) {
    return this.userStoreService.authenticate(user);
  }

  register(user: Partial<User>) {
    return this.userStoreService.addUser(user);
  }
}
