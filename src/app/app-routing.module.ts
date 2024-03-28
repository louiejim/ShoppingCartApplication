import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './modules/product/product.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { userGuard } from './core/guards/user.guard';
import { UserListModule } from './modules/user-list/user-list.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { userlistGuard } from './core/guards/userlist.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => UserModule),
  },

  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => ProductModule),
  },
  {
    path: 'dashboard',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => DashboardModule
      ),
  },
  {
    path: 'userlist',
    canActivate: [userlistGuard],
    loadChildren: () =>
      import('./modules/user-list/user-list.module').then(
        (m) => UserListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
