import { Users } from './../../../../shared/model/users.interface';
import { map } from 'rxjs';
import {Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private userProfile: ProfileService,
    private fb: FormBuilder,
    private tostr: ToastrService
  ) {}

  isEnable: boolean = false;

  user: Users | undefined;

  form = this.fb.group({
    id: '',
    username: this.fb.control('', Validators.required),
    password: '',
    email: this.fb.control('', Validators.required),
    mobile: '',
    firstName: this.fb.control('', Validators.required),
    middleName: this.fb.control(''),
    lastName: this.fb.control('', Validators.required),
    birthdate: new Date(),
    interests: this.fb.array([]),
    role: '',
  });

  itemsFormArray = this.form.get('interests') as FormArray;

  ngOnInit(): void {
    this.form.disable();
    const id = sessionStorage.getItem('id');
    this.userProfile
      .getUserById(id)
      .pipe(
        map((x) => {
          x.map((m) => {
            m.interests.forEach((items) => {
              this.itemsFormArray.push(this.fb.control(items));
            });
            this.user = m;
            this.form.setValue({
              id: m.id,
              username: m.username,
              password: m.password,
              email: m.email,
              mobile: String(m.mobile),
              firstName: m.firstName,
              middleName: m.middleName,
              lastName: m.lastName,
              birthdate: m.birthdate,
              interests: this.itemsFormArray.value,
              role: m.role,
            });
          });
        })
      )
      .subscribe((m) => m);
  }
  add() {
    this.itemsFormArray.push(new FormControl(''));
  }
  delete(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  toggleInputEnable() {
    this.isEnable = true;
    this.form.enable();
    this.itemsFormArray.enable();
  }
  toggleInputDisble() {
    this.isEnable = false;
    this.form.disable();
    this.itemsFormArray.disable();
  }

  submit() {
    this.userProfile
      .updateUser(this.form.value, this.form.value.id)
      .subscribe((m) => {
        this.tostr.success('Successfuly Save');
      });
    this.toggleInputDisble();
  }
}
