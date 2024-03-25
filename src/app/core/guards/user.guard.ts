import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../modules/user/service/user.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const userGuard: CanActivateFn = (route, state) => {
  const service: UserService = inject(UserService);
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);

  if (service.isLogin()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
