import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    username: this.username,
    password: this.password,
  });


  loginUser(formdata: any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.snackbar.open(data.json().message, '', {duration: 2000});
          } else {
            this.snackbar.open('login is succesvol', '', {duration: 2000});
            this.router.navigate(['report']);
          }
          this.loginForm.reset();
        });
    }
  }

}
