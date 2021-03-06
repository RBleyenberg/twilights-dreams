import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material';

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackbar: MatSnackBar) {
  }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required]);
  retypepass = new FormControl('', [Validators.required]);


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, {validator: comparePassword})
    });
  }

  registerUser(formdata: any): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      const theForm = this.registerForm.value;
      const thePass = this.registerForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.snackbar.open(data.message, '', {duration: 2000});
          } else {
            this.snackbar.open(data.message, '', {duration: 2000});
            this.router.navigate(['user/login']);
          }
          this.registerForm.reset();
        });
    }
  }
}
