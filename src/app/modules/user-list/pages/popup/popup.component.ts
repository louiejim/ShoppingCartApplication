import { Component, Inject, OnInit, inject } from '@angular/core';
import { UserService } from '../../../user/service/user.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    @Inject(MAT_DIALOG_DATA) public value: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<PopupComponent> //component of the popup
  ) {}
  ngOnInit(): void {
    this.service.gerRole().subscribe((m) => {
      this.role = m;
    });
    if (this.value.code != null && this.value.code != '') {
      this.service.getbyUserById(this.value.code).subscribe((x) => {
        x.map((m) => {
          this.Form.setValue({
            id: m.id,
            username: m.username,
            password: m.password,
            email: m.email,
            mobile: m.mobile,
            firstName: m.firstName,
            middleName: m.middleName,
            lastName: m.lastName,
            birthdate: m.birthdate,
            interests: m.interests,
            role: m.role,
          });
        });
      });
    }
  }
  //form
  Form = this.builder.group({
    id: '',
    username: '',
    password: '',
    email: '',
    mobile: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: '',
    interests: new Array(),
    role: this.builder.control(''),
  });

  update() {
    const value = this.Form.value;
    if (value.role?.length != 0) {
      this.service.updateUser(value, value.id).subscribe((m) => {
        this.toastr.success('Updated successfully.');
        this.dialog.close(); //closing the pop up
      });
    }
  }
}
