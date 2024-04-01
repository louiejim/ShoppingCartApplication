import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeletePopupComponent } from './pages/delete-popup/delete-popup.component';

@NgModule({
  declarations: [CartComponent, DeletePopupComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatTableModule,
    ToastrModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class CartModule {}
