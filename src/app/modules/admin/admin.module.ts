import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRouterModule } from './admin-router.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRouterModule],
})
export class AdminModule {}
