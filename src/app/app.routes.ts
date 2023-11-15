import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: async () => (await import('@pages/login')).routes,
        canMatch: [authGuard({ requiresAuthentication: false })],
    },
    {
        path: '',
        loadChildren: async () => (await import('@pages/home')).routes,
        canMatch: [authGuard({ requiresAuthentication: true })],
    },
    {
        path: 'projects',
        loadChildren: async () => (await import('@pages/projects')).routes,
        canMatch: [authGuard({ requiresAuthentication: true })],
    },
    {
        path: 'statistics',
        loadChildren: async () => (await import('@pages/statistics')).routes,
        canMatch: [authGuard({ requiresAuthentication: true })],
    },
];
