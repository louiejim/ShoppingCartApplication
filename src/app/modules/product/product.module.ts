import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRouterModule } from './product-router.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRouterModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    SharedModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
