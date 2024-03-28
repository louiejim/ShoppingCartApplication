import { Component, OnInit } from '@angular/core';
import { UserService } from '../../modules/user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  firstname: any;
  userRole: any;
  constructor(private serivce: UserService) {}
  ngOnInit(): void {
    this.firstname = sessionStorage.getItem('firstname');
    this.userRole = this.serivce.getUserRole();
  }
}
