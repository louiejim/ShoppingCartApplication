import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const userlistGuard: CanActivateFn = (route, state) => {
  const toastr: ToastrService = inject(ToastrService);
  const router: Router = inject(Router);
  if (sessionStorage.getItem('role') != 'admin') {
    toastr.warning('You Dont Have Access...');
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
