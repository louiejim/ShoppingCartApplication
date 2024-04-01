import { map, filter, BehaviorSubject } from 'rxjs';
import { Injectable, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartList: any = JSON.parse(localStorage.getItem('cart') || '[]');

  constructor(private toastr: ToastrService) {}

  getProduct() {
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
    this.cartList.find((i: any, index: any) => {
      i.id === id;
      if (i.id === id) {
        indexs = index;
      }
    });
    this.cartList.splice(indexs, 1);
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
}
