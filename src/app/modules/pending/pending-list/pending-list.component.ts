import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PendingService } from '../service/pending.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { orders } from '../../../shared/model/orders.interface';
import { Product } from '../../../shared/model/product.interface';
import { products } from '../../../shared/model/products.interface';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  totalItems = 0;
  allProducts: products[] = []; 
  userId: any;

  constructor(
    private router: Router,
    private pendingService: PendingService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sort = this.sort;
    this.userId = sessionStorage.getItem('id') || '';
    this.getOrders();
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getProductName(productId: any): any {
    console.log('All products:', this.allProducts); 
    console.log('Product ID:', productId);
    
    console.log('All product IDs:', this.allProducts.map(prod => prod.id));
    const product = this.allProducts.find(prod => prod.id.toString() === productId.toString());
    
    console.log('Product found:', product);
    return product ? product.name : 'Unknown Product';
  }
  

loadProducts() {
  this.pendingService.getAllProducts()
    .subscribe(
      (products: products[]) => {
        console.log('Products fetched:', products);
        this.allProducts = products;
        this.getOrders(); // Call getOrders() once allProducts is populated
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
}

getTotalPrice(order: orders): number {
  let totalPrice = 0;
  order.products.forEach(product => {
    const foundProduct = this.allProducts.find(prod => prod.id.toString() === product.productId.toString());
    if (foundProduct) {
      totalPrice += foundProduct.price * product.quantity;
    }
  });
  return totalPrice;
}

getOrders() {
  this.pendingService.getOrdersByUserIdAndStatus(this.userId, 'pending') // Filter orders by user ID and status
    .pipe(
      catchError(error => {
        console.error('Error loading pending orders:', error);
        return throwError('Could not load pending orders');
      })
    )
    .subscribe(orders => {
      console.log('Orders:', orders);
      const products = orders.flatMap(order => order.products.map((product: Product) => ({
        productName: this.getProductName(product.productId), 
        quantity: product.quantity,
        status: order.status,
        totalPrice: (this.allProducts.find(prod => prod.id.toString() === product.productId.toString())?.price || 0) * product.quantity
      })));
      console.log('Products:', products);
      this.dataSource.data = products;
      this.totalItems = products.length;
    });
}

shopNow() {
  this.router.navigate(['/dashboard']);
}

}