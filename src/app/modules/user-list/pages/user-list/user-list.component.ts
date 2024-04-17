import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Users } from '../../../../shared/model/users.interface';
import { UserListService } from '../../service/user-list.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  userListComponent: UserListComponent | string = this;
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
    birthdate: '',
    interests: [],
    active: true,
    role: 'user',
  };
  originalUser: Users | null = null;
  confirmationDialogActivate: boolean = false;
  confirmationDialogDeactivate: boolean = false;
  userToDeactivate: Users | null = null;
  selectedInterest: string[] = [];
  isDuplicateUsername: boolean = false;
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
  constructor(private userListService: UserListService) {}

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
  checkDuplicateUsername(username: string): boolean {
    return this.users.some(user => user.username === username);
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
    this.userToDeactivate = null;
    this.confirmationDialogActivate = false;
  }

  addNewUser() {
    this.isDuplicateUsername = this.checkDuplicateUsername(this.newUser.username);
    if (this.isDuplicateUsername) {
      console.error("Username already exists.");
      return;
    }
    this.newUser.id = this.getNextUserId();
    this.newUser.interests = this.selectedInterest;
    this.addUser(this.newUser);
    this.showAddUserForm = !this.showAddUserForm;
    this.selectedInterest = [];
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
      birthdate: '',
      interests: [],
      active: true,
      role: 'user',
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