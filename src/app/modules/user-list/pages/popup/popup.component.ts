import { Component, Inject, OnInit, inject } from '@angular/core';
import { UserService } from '../../../user/service/user.service';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../../../../shared/model/users.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  role: any;
  constructor(
    private service: UserService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public value: any
  ) {}


  user: Users | undefined;
  ngOnInit(): void {
    this.service.gerRole().subscribe((m) => {
      this.role = m;
    });


    if (this.value.code != null && this.value.code != '') {
      this.service.getbyUserById(this.value.code).subscribe((m) => {
        
        m.map((m) => {
          // setting value to the form from api call
          this.user = m;
          this.Form.setValue({
              id:this.user.id,
            username: this.user.username,
            password: this.user.password,
            email: this.user.email,
            mobile: String(this.user.mobile),
            firstName: this.user.firstName,
            middleName: this.user.middleName,
            lastName: this.user.lastName,
            birthdate: String(this.user.birthdate),
            interest: [],
            role: this.user.role,
          });          
        });
      });
    }
  }

  Form = this.builder.group({
    id:"",
    username: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    mobile: this.builder.control(''),
    firstName: this.builder.control(''),
    middleName: this.builder.control(''),
    lastName: this.builder.control(''),
    birthdate: this.builder.control(''),
    interest: this.builder.array([]),
    role: this.builder.control('', Validators.required),
  });

  update() {
    // this.user=this.Form.value
    console.log(this.Form.value);
  }
}
