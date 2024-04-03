import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingListComponent } from './pending-list/pending-list.component';
import { PendingRoutingModule } from './pending-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../../shared/shared.module';
import { MatIcon } from '@angular/material/icon';



@NgModule({
  declarations: [
    PendingListComponent,
  ],
  imports: [
    CommonModule,
    PendingRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    MatIcon,
  ]
})
export class PendingModule { }
