import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  constructor(
    private dialog: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public value: any,
    private toastr: ToastrService,
    private service: CartService
  ) {}

  back() {
    this.dialog.close();
  }

  delete() {
    this.service.removeCartItem(this.value.code);
    this.toastr.success('Successfully Deleted');
    this.dialog.close();
  }
}
