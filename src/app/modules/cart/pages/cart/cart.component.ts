import { CartService } from '../../service/cart.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  userId: any;

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
    this.userId = sessionStorage.getItem('id') || '';
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
      width: '16%',
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

  toCheckoutPage() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    const cartItems = this.dataSource.filteredData;

    this.Service.getOrdersByUserIdAndStatus(this.userId, 'in-cart').subscribe(
      (existingOrders: any[]) => {
        if (existingOrders.length > 0) {
          // Update the existing order with new cart items
          const orderId = existingOrders[0].id;
          const updatedOrder: any = {
            id: orderId,
            userId: this.userId,
            products: existingOrders[0].products, // Keep existing products
            status: 'in-cart',
          };

          // Add new cart items to the existing order
          for (const item of cartItems) {
            const productId = item.id as any;
            const quantity = item.quantity;

            const existingProductIndex = updatedOrder.products.findIndex(
              (product: any) => product.productId === productId
            );
            if (existingProductIndex !== -1) {
              updatedOrder.products[existingProductIndex].quantity += quantity;
            } else {
              // If the product does not exist, add it to the order
              updatedOrder.products.push({
                productId: productId as any,
                quantity: quantity,
              });
            }
          }

          this.Service.updateOrder(orderId, updatedOrder).subscribe(
            (response) => {
              console.log('Order updated:', response);
              this.router.navigate(['/checkout']);
            },
            (error) => {
              console.error('Error updating order:', error);
            }
          );
        } else {
          const newOrder: any = {
            userId: this.userId,
            products: [],
            status: 'in-cart',
          };

          for (const item of cartItems) {
            const productId = item.id as any;
            const quantity = item.quantity;
            newOrder.products.push({
              productId: productId as any,
              quantity: quantity,
            });
          }

          this.Service.addToOrders(newOrder).subscribe(
            (response) => {
              console.log('New order added:', response);
              this.router.navigate(['/checkout']);
            },
            (error) => {
              console.error('Error adding new order:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching existing orders:', error);
      }
    );
  }
}
