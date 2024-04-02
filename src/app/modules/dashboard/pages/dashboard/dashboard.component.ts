import { filter } from 'rxjs';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/service/cart.service';
import { AddcartPopupComponent } from '../addcart-popup/addcart-popup.component';
import { MatDialog } from '@angular/material/dialog';
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
<<<<<<< HEAD

=======
>>>>>>> 4bba5d5f0a13f0b045b9d200217fe43092eb1b25
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
  }

  addtoCart(item: any) {
    // this.cartservice.addToCart(item);

    const popup = this.dialog.open(AddcartPopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '18%',
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
}
