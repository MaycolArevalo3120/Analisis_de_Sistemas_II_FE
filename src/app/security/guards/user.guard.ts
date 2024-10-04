import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserGuardGuard {
  dataSource: any;
  constructor(private cookieService: CookieService, public router: Router) {}

  canActivate(): boolean {
    const cookie = this.cookieService.check('jwt');
    if (!cookie) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no se ha registrado',
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}

export const userGuardGuard: CanActivateFn = (route, state) => {
  return inject(UserGuardGuard).canActivate();
};

