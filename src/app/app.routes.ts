import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/user-dashboard/user-dashboard.component')
        .then(m => m.UserDashboardComponent)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
];
