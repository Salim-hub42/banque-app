import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './features/dashboard/components/dashboard/dashboard';
import { Login } from './features/auth/components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [authGuard], component: Dashboard },
  { path: 'login', component: Login },

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
