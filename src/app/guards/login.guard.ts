import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const cookieServices = inject(CookieService)
  const router = inject(Router)
  if(cookieServices.get('token')){
    return true
  }else{
    router.navigate(["/login"])
    return false
  }
};
