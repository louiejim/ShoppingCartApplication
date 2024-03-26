import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent implements OnInit {

  @Input() password: any;


  constructor(private router: Router, private toastr: ToastrService) {}
  back() {
    this.router.navigate(['']);
    this.toastr.success('Please Log in...');
  }
  ngOnInit(): void {
    console.log(this.password)
  }
}
