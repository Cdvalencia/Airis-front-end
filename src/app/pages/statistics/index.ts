import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Statistics',
        loadComponent: async () => (await import('./statistics.component')).StatisticsComponent,
    },
];
