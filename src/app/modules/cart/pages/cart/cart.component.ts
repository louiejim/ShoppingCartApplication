import { CartService } from '../../service/cart.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PopupComponent } from '../../../user-list/pages/popup/popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, AfterViewInit {
  public grandTotal: number = 0;
  dataSource: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private Service: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.Service.getProduct());
  }

  displayedColumns: string[] = [
    'no',
    'name',
    'category',
    'price',
    'img',
    'quantity',
    'total',
    'action',
  ];

  shopNow() {
    this.router.navigate(['/dashboard']);
  }

  deleteCart(id: any) {
    const popup = this.dialog.open(DeletePopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '18%',
      data: {
        code: id,
      },
    });

    popup.afterClosed().subscribe((res) => {
      this.dataSource = new MatTableDataSource(this.Service.getProduct());
    });
  }

  increment(id: any) {
    this.Service.incrementQuantity(id);
  }
  decrement(id: any, quantity: any) {
    if (quantity === 1) {
      this.deleteCart(id);
    } else {
      this.Service.decrementQuantity(id);
    }
  }
}
