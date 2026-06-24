import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const estConnecte = true
  ;

  if (estConnecte) return true;

  return router.createUrlTree(['/dashboard']);
};
