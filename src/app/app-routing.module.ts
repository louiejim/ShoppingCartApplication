import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './modules/product/product.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { userGuard } from './core/guards/user.guard';
import { UserListModule } from './modules/user-list/user-list.module';

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
    path: 'admin',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => AdminModule),
  },
  {
    path: 'userlist',
    canActivate: [userGuard],
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
