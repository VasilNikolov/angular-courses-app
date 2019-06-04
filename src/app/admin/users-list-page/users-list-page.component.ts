import {Component, OnInit} from '@angular/core';
import {UsersStoreService} from '../../core/users/users-store.service';
import {User} from '../../core/users/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {
  users: User[];

  constructor(private usersSessionService: UsersStoreService) {
  }

  ngOnInit() {
    this.usersSessionService.users$.subscribe(users => this.users = users);
  }

  onToggleBlocked(userId: string) {
    this.usersSessionService.toggleBlockUserById(userId).subscribe();
  }
}
