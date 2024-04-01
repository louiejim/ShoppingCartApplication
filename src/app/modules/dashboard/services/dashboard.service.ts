import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  localHost = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.localHost}/products`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  //http://localhost:3000/products?category=laptop
  getProductsByCategory(category: any) {
    return this.http
      .get(`${this.localHost}/products?category=${category}`)
      .pipe(map((res: any) => res));
  }

  // private items: any;

  // addToCart(product: any) {
  //   this.items.push(product);
  // }
}
