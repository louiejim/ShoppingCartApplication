import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { CartService } from '../../../cart/service/cart.service';

@Component({
  selector: 'app-addcart-popup',
  templateUrl: './addcart-popup.component.html',
  styleUrl: './addcart-popup.component.scss',
})
export class AddcartPopupComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<AddcartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public value: any,
    private toastr: ToastrService,
    private service: CartService
  ) {}
  item: any;
  ngOnInit(): void {
    this.item = this.value.code;
  }
  back() {
    this.dialog.close();
  }
  increment() {
    this.item.quantity++;
  }
  submit() {
    this.item.total = this.item.price * this.item.quantity;
    this.toastr.success('Success');
    this.service.addToCart(this.item);
    this.dialog.close();
  }
}
