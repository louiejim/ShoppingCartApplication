import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { orders } from '../../../shared/model/orders.interface';
import { products } from '../../../shared/model/products.interface';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient)  { }

  getOrdersByStatus(status: string): Observable<orders[]> {
    return this.http.get<orders[]>(`${this.baseUrl}/orders?status=${status}`);
  }

  getAllProducts(): Observable<products[]> {
    return this.http.get<products[]>(`${this.baseUrl}/products`);
  }

  getOrdersByUserIdAndStatus(userId: string, status: string): Observable<orders[]> {
    const url = `${this.baseUrl}/orders?userId=${userId}&status=${status}`;
    return this.http.get<orders[]>(url);
  }
  
}
