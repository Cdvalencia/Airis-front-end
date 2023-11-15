import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Login',
        loadComponent: async () => (await import('./login.component')).LoginComponent,
    },
];
