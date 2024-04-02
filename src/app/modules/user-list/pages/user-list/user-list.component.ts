import { Observable } from 'rxjs';
import { Component, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../../../user/service/user.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Users } from '../../../../shared/model/users.interface';
import { UserListService } from '../../service/user-list.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  editForm!: FormGroup;
  dataSource!: MatTableDataSource<Users>;
  users: Users[] = [];
  showAddUserForm: boolean = false;
  roles = ['admin', 'user'];
  newUser: Users = {
    id: '',
    username: '',
    password: '',
    email: '',
    mobile: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: new Date('1900-01-01'),
    interests: [],
    active: true,
    role: 'user',
  };
  originalUser: Users | null = null;
  confirmationDialogActivate: boolean = false;
  confirmationDialogDeactivate: boolean = false;
  userToDeactivate: Users | null = null;
  selectedInterest: string[] = [];
  interests = [
    'Fashion and clothing',
    'Electronics and gadgets',
    'Home decor and furnishings',
    'Beauty and skincare products',
    'Fitness and sports equipment',
    'Books and stationery',
    'Cooking and kitchen appliances',
    'Gardening supplies',
    'Toys and games',
    'Collectibles and memorabilia',
    'DIY and crafting materials',
    'Outdoor gear and camping equipment',
    'Pet supplies',
    'Art and craft supplies',
    'Musical instruments',
    'Specialty foods and gourmet items',
    'Travel accessories',
    'Sustainable and eco-friendly products',
    'Vintage and antique items',
    'Health and wellness products',
  ];
  displayedColumns: string[] = [
    'userName',
    'password',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'mobile',
    'birthdate',
    'actions',
  ];
  constructor(private userListService: UserListService) {}
  userName = sessionStorage.getItem('userName');
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Users>(this.users);
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.userListService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource.data = users;
    });
  }

  toggleEditMode(user: Users) {
    user.editMode = !user.editMode;
    if (user.editMode) {
      this.originalUser = { ...user };
    } else {
      if (this.originalUser) {
        Object.assign(user, this.originalUser);
        this.originalUser = null;
        user.editMode = false;
      }
    }
  }

  isFormValid(user: Users): boolean {
    return (
      !!user.username &&
      !!user.password &&
      !!user.email &&
      !!user.mobile &&
      !!user.firstName &&
      !!user.lastName
    );
  }

  addUser(user: Users) {
    this.userListService.addUser(user).subscribe(() => {
      this.getUsers();
      this.resetNewProduct();
    });
  }

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  updateUser(user: Users) {
    this.userListService.updateUser(user).subscribe(() => {
      this.getUsers();
    });
    user.editMode = false;
  }

  deactivateUser(user: Users) {
    this.userToDeactivate = user;
    this.confirmationDialogDeactivate = true;
  }

  activateUser(user: Users) {
    this.userToDeactivate = user;
    this.confirmationDialogActivate = true;
  }

  confirmDeactivate() {
    if (this.userToDeactivate) {
      this.userListService
        .deactivateUser(this.userToDeactivate.id)
        .subscribe(() => {
          this.users = this.users.filter(
            (prod) => prod.id !== this.userToDeactivate!.id
          );
          this.getUsers();
          this.closeConfirmationDialogDeactivate();
        });
    }
  }

  confirmActivate() {
    if (this.userToDeactivate) {
      this.userListService
        .activateUser(this.userToDeactivate.id)
        .subscribe(() => {
          this.users = this.users.filter(
            (prod) => prod.id !== this.userToDeactivate!.id
          );
          this.getUsers();
          this.closeConfirmationDialogActivate();
        });
    }
  }

  closeConfirmationDialogActivate() {
    this.confirmationDialogActivate = false;
    this.userToDeactivate = null;
  }
  closeConfirmationDialogDeactivate() {
    this.confirmationDialogActivate = false;
    this.userToDeactivate = null;
  }

  addNewUser() {
    this.newUser.id = this.getNextUserId();
    this.newUser.interests = this.selectedInterest;
    this.addUser(this.newUser);
    this.showAddUserForm = !this.showAddUserForm;
  }

  private resetNewProduct() {
    this.newUser = {
      id: '',
      username: '',
      password: '',
      email: '',
      mobile: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      birthdate: new Date('1900-01-01'),
      interests: [],
      active: false,
      role: '',
    };
  }
  private getNextUserId(): string {
    const maxId = this.users.reduce(
      (max, user) => (parseInt(user.id) > max ? parseInt(user.id) : max),
      0
    );
    return (maxId + 1).toString();
  }
}
