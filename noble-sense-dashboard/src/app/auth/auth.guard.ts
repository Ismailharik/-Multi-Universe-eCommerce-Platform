import {inject } from '@angular/core';
import { CanActivateFn, Router,} from '@angular/router';
import { AuthenticationService } from '../pages/authentication/services/authentication.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(['/authentication/login']);
  }
  
  return authService.isLoggedIn();
};