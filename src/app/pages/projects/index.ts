import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Projects',
        loadComponent: async () => (await import('./projects.component')).ProjectsComponent,
    },
];
