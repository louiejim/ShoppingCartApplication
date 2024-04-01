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

@NgModule({
  declarations: [DashboardComponent, AddcartPopupComponent],
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
  ],
})
export class DashboardModule {}
