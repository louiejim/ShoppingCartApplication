import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

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
  ) {
    sessionStorage.clear();
  } //session storage clear

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

      let userRole: string;
      let tempusername: string;
      let id: string;
      this.service.getbyUserName(username).subscribe((m) => {
        m.map((m) => {
          userRole = m.role;
          tempusername = m.username;
          id = m.id;
        });
        const result = m.filter((x) => x.password === password);
        if (result.length === 1) {
          this.toastr.success('Login Success');
          sessionStorage.setItem('username', tempusername);
          sessionStorage.setItem('role', userRole);
          sessionStorage.setItem('id', id);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('Invalid Login');
        }
      });
    }
  }

  forgotPassword() {
    this.router.navigate(['/password']);
  }
}
