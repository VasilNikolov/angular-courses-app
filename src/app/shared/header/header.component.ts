import { Component} from '@angular/core';
import {SessionService} from '../../core/users/session.service';
import {Role} from '../../core/users/roles.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Role = Role;
  constructor(private sessionService: SessionService, private router: Router) { }

  onLogout() {
    this.sessionService.removeSession();
    this.router.navigate(['/auth/login']);
  }
}
