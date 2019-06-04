import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../../core/users/user.interface';
import {SessionService} from '../../core/users/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((user: User) => {
      this.sessionService.setSessionId(user.guid);
      this.router.navigate(['courses']);
    }, () => {
      this.loginForm.setErrors({authenticationError: true});
    });
  }

}
