import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/service/cart.service';
import { AddcartPopupComponent } from '../addcart-popup/addcart-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { products } from '../../../../shared/model/products.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  search: string | undefined;
  number: any;
  maxValue: number;
  minValue: number;
  topFiveProducts: products[] = [];
  userRole!: string;
  constructor(
    private api: DashboardService,
    private cartservice: CartService,
    private dialog: MatDialog
  ) {
    this.maxValue = 1000000;
    this.minValue = 0;
  }

  public productList: any;

  ngOnInit(): void {
    this.getAllProduct();
    this.userRole = sessionStorage.getItem('role') || '';
    this.getTopFiveProducts();
  }

  addtoCart(item: any) {
    // this.cartservice.addToCart(item);

    const popup = this.dialog.open(AddcartPopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '17%',
      data: {
        code: item,
      },
    });

    popup.afterClosed().subscribe(() => {
      this.getAllProduct();
    });

    this.number = this.cartservice.getProduct().length;
  }

  //getting product by category
  getProductByCategory(category: string) {
    this.api.getProductsByCategory(category).subscribe((res) => {
      this.productList = res;
      console.log(this.productList);
      this.productList.forEach((element: any) => {
        //adding initial quatity
        Object.assign(element, { quantity: 1, total: element.price });
        this.number = this.cartservice.getProduct().length;
      });
    });
  }

  getAllProduct() {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;

      this.productList.forEach((element: any) => {
        //adding initial quatity
        Object.assign(element, { quantity: 1, total: element.price });
        this.number = this.cartservice.getProduct().length;
      });
    });
  }

  getTopFiveProducts() {
    this.api.getProducts().subscribe((products: products[]) => {
      const validProducts = products.filter(
        (product) => product.sold !== undefined
      );
      validProducts.sort((a, b) => {
        if (a.sold && b.sold) {
          return b.sold - a.sold;
        }
        return 0;
      });
      this.topFiveProducts = validProducts.slice(0, 5);
    });
  }
}
