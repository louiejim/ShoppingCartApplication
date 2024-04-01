import { Component, OnInit } from '@angular/core';
import { UserService } from '../../modules/user/service/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../modules/cart/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  firstname: any;
  userRole: any;
  constructor(
    private serivce: UserService,
    private route: Router,
    private cart: CartService
  ) {}
  ngOnInit(): void {
    this.firstname = sessionStorage.getItem('firstname');
    this.userRole = this.serivce.getUserRole();
  }
  logout() {
    this.route.navigate(['']);
    this.cart.LogOut();
  }
}
