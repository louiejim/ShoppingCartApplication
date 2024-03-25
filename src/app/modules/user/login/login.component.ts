import { Users } from './../../../shared/model/users.interface';
import { filter, map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userdata: any;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: this.fb.control(''),
    password: this.fb.control(''),
  });

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  proceedLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username as string;
      const password = this.loginForm.value.password as string;

      this.service.getbyUserName(username).subscribe((m) => {
        const result = m.filter((x) => x.password === password);
        if (result.length === 1) {
          this.toastr.success('Login Success');
          this.router.navigate(['/admin']);
        } else {
          this.toastr.error('Invalid Login');
        }
      });
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}
