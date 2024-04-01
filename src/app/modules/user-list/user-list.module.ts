import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserListRoutingModule } from './user-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { PopupComponent } from './pages/popup/popup.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, PopupComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class UserListModule {}
