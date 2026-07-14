import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
   path: 'dashboard',
   canActivate: [authGuard],
   loadComponent: () => import('./features/dashboard/components/dashboard/dashboard').then(m => m.Dashboard)
  },

  { path: 'login',
    loadComponent: () => import('./features/auth/components/login/login').then(m => m.Login)
    },

  {
    path: 'clients',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./features/clients/components/clients/clients')
        .then(m => m.Clients)
  },

  {
    path: 'clients/nouveau',
    loadComponent: () =>
      import('./features/clients/components/formulaire-client/formulaire-client')
        .then(m => m.FormulaireClient)
  },

  {
    path: 'clients/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/clients/components/detail-client/detail-client')
        .then(m => m.DetailClient)
  },

  {
    path: 'comptes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/comptes/components/comptes/comptes')
        .then(m => m.Comptes)
  },
  
  { path: '**', redirectTo: 'login' },
];
