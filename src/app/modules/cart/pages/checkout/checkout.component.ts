import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public grandTotal: number = 0;
  dataSource: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  userId: any;

  constructor(
    private toastr: ToastrService,
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
    this.userId = sessionStorage.getItem('id') || '';
    this.calculateGrandTotal();
  }

  increment(id: any) {
    this.Service.incrementQuantity(id);
  }

  displayedColumns: string[] = ['name', 'category', 'price', 'img', 'quantity'];

  calculateGrandTotal() {
    if (this.dataSource) {
      this.grandTotal = this.dataSource.filteredData.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      );
    } else {
      console.warn('DataSource is not available.');
    }
  }

  checkoutAll() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.Service.getOrdersByUserIdAndStatus(this.userId, 'in-cart').subscribe(
      (existingOrders: any[]) => {
        if (existingOrders.length > 0) {
          // Update the status of existing orders to 'pending'
          existingOrders.forEach((order) => {
            this.Service.updateOrderStatus(order).subscribe(
              (response) => {
                console.log('Order status updated:', response);
              },
              (error) => {
                console.error('Error updating order status:', error);
              }
            );
          });
        } else {
          console.log('No existing orders with "in-cart" status for the user.');
        }

        localStorage.clear();
        this.toastr.success('Checkout Successful!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error fetching existing orders:', error);
      }
    );
  }
}
