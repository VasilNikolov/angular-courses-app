import {Injectable} from '@angular/core';
import {SessionService} from '../core/users/session.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Role} from '../core/users/roles.enum';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.sessionService.hasSession$.pipe(map(session => {
      if (session && route.data.userRole === Role.ADMIN) {
        return true;
      }
      this.router.navigateByUrl('/auth/login');
      return false;
    }));
  }
}
