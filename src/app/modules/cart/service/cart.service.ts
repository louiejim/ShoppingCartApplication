import { map, filter, BehaviorSubject, Observable, catchError, throwError, of } from 'rxjs';
import { Injectable, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { orders } from '../../../shared/model/orders.interface';
import { products } from '../../../shared/model/products.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartList: any = JSON.parse(localStorage.getItem('cart') || '[]');
  private baseUrl = 'http://localhost:3000';
  private ordersUrl = 'http://localhost:3000/orders';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) {}

  getProduct() {
    console.log(this.cartList);
    return this.cartList;
  }

  addToCart(products: any) {
    let a = this.cartList.some((i: any) => i.id === products.id); //if there'a a existing in our list

    if (a) {
      this.incrementQuantity(products.id);
      this.getTotal(products.id);
    } else {
      this.cartList.push(products);
    }
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }

  incrementQuantity(id: number) {
    let item = this.cartList.find((i: any) => i.id === id);
    if (item) {
      this.cartList.quantity = item.quantity++;
    }
    this.getTotal(id);
  }

  decrementQuantity(id: number) {
    let item = this.cartList.find((i: any) => i.id === id);

    if (item) {
      this.cartList.quantity = item.quantity--;
    }
    this.getTotal(id);
  }

  removeCartItem(id: any) {
    let indexs: any;
    let a = this.cartList.find((i: any, index: any) => {
      i.id === id;
      if (i.id === id) {
        indexs = index;
      }
    });
    this.cartList.splice(indexs, 1);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }

  getTotal(id: number) {
    let item = this.cartList.find((i: any) => i.id === id);
    if (item) {
      this.cartList.find((i: any) => i.id === id).total =
        item.quantity * item.price;
    }
  }
  LogOut() {
    this.cartList = [];
    this.toastr.warning('your cart will be empty!!');
  }

  //newly added
    //for checkout
    addToOrders(order: any): Observable<any> {
      return this.http.post<any>(this.ordersUrl, order);
    }
  
    createOrder(orders: any[]): Observable<any> {
      if (orders.length === 0) {
        return new Observable();
      }
    
      const formattedOrders = orders.map((order: any) => {
        return {
          productId: order.id,
          quantity: order.quantity,
          status: 'pending' // Set status to pending
        };
      });
    
      
      return this.http.post(this.ordersUrl, formattedOrders);
    }
  
  
  // Update order status
  updateOrderStatus(order: any): Observable<any> {
    const url = `${this.ordersUrl}/${order.id}`;
    const updatedOrder = { ...order, status: 'pending' }; 
    return this.http.put<any>(url, updatedOrder).pipe(
      catchError(error => {
        console.error('Error updating order status:', error);
        return throwError('Error updating order status');
      })
    );
  }
  
  updateOrder(orderId: string, updatedOrderData: any): Observable<orders> {
    const url = `${this.baseUrl}/orders/${orderId}`;
    return this.http.put<orders>(url, updatedOrderData);
  }

  getOrdersByUserIdAndStatus(userId: any, status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders?userId=${userId}&status=${status}`);
  }
}
