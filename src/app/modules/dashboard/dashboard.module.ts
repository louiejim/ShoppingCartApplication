import { DashboardRouterModule } from './dashboard-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AddcartPopupComponent } from './pages/addcart-popup/addcart-popup.component';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { MatSelectModule } from '@angular/material/select';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { RangeFilterPipe } from '../pipes/range-filter.pipe';
=======
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { RangeFilterPipe } from '../pipes/range-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
>>>>>>> 4bba5d5f0a13f0b045b9d200217fe43092eb1b25

@NgModule({
  declarations: [
    DashboardComponent,
    AddcartPopupComponent,
    SearchFilterPipe,
    RangeFilterPipe,
  ],
  imports: [
    CommonModule,
    DashboardRouterModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
  ],
})
export class DashboardModule {}
