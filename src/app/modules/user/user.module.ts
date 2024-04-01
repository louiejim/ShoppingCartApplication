import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserPasswordComponent } from './user-password/user-password.component';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from './user-password/password/password.component';
@NgModule({
  declarations: [LoginComponent, UserPasswordComponent, PasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButton,
    RouterLink,
    MatIconModule,
  ],
  exports: [LoginComponent],
})
export class UserModule {}
