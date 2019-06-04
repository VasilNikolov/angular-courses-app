import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SessionService} from '../../core/users/session.service';
import {Router} from '@angular/router';
import {comparePasswordsValidator} from '../../core/utils/comparePasswords.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    name: [null, Validators.required],
    password: [null, Validators.required],
    repeatPassword: [null, [Validators.required, comparePasswordsValidator]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/auth/login']);
    }, () => {
      this.registerForm.setErrors({registerError: true});
    });
  }
}
