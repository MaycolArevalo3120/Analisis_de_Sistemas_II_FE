import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'proyectos',
                title: 'Asignación de proyectos',
                loadComponent: () => import('./dashboard/pages/proyectos/proyectos.component')
            },
            {
                path: 'proyect-table',
                title: 'Tabla de proyectos',
                loadComponent: () => import('./dashboard/pages/project-table/project-table.component'),
            },
            {
                path: '', 
                redirectTo: 'proyectos', 
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./dashboard/pages/login/login.component')
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./dashboard/pages/sign-up/sign-up.component')
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
