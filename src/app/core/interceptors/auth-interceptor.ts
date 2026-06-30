import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const raw = localStorage.getItem('utilisateur');
  if (!raw) return next(req);

  const utilisateur = JSON.parse(raw);
  const reqModifiee = req.clone({
    setHeaders: {
      Authorization: `Bearer ${utilisateur.id}`
    }
  });

  return next(reqModifiee);
};
