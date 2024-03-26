import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRouterModule } from './admin-router.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRouterModule,SharedModule],
})
export class AdminModule {}
