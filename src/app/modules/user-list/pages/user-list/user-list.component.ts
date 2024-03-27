import { Component, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../../../user/service/user.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  constructor(private service: UserService, private dialog: MatDialog) {
    this.loadUser();
  }
  //sorting and pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList: any;
  dataSource: any;
  loadUser() {
    this.service.getAll().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'role',
    'action',
  ];

  updateUser(id: any) {
    this.dialog.open(PopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      data: {
        code: id,
      },
    });
  }
}
