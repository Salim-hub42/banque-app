import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const estConnecte = authService.estConnecte();

  if (estConnecte) return true;

  return router.createUrlTree(['/login']);
};
