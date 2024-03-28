import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrl: './user-password.component.scss',
})
export class UserPasswordComponent {
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  forgotForm = this.fb.group({
    username: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.required),
    mobile: this.fb.control('', Validators.required),
  });

  pass: any;

  checkPassword() {
    const username = this.forgotForm.value.username;
    const email = this.forgotForm.value.email;
    const mobile = this.forgotForm.value.mobile;

    let temptpassword: any;
    let temptuser: any;
    let temptemail: any;
    let temptmobile: any;

    if (this.forgotForm.valid) {
      this.service.getForgotPassword(username, email, mobile).subscribe((m) => {
        m.map((m) => {
          temptuser = m.username;
          temptemail = m.email;
          temptmobile = m.mobile;
          temptpassword = m.password;
        });
        if (temptuser && temptemail && temptmobile) {
          this.pass = temptpassword;
          this.toastr.success('Success');
        } else {
          this.toastr.error('Attempt is invalid');
        }
      });
    } else {
      this.toastr.error('Attempt is invalid');
    }
  }

  back() {
    this.router.navigate(['']);
  }
}
