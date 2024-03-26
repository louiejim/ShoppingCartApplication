import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './modules/product/product.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginComponent } from './modules/user/login/login.component';
import { UserModule } from './modules/user/user.module';
import { userGuard } from './core/guards/user.guard';

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
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
