import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        /**
         * Se debe de colocar RouterModule en el archivo ts de dashboard para que pueda ser utilizado en las rutas, y poder usar el router-outlet, de no ser así, no mostrará las rutas hijas
         */
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'proyectos',
                title: 'Asignación de proyectos s',
                loadComponent: () => import('./dashboard/pages/proyectos/proyectos.component'),
            },
            {
                path: '', redirectTo: 'proyectos', pathMatch: 'full'
            }
        ]
    },
    /**
     * Como dashboar no es la ruta principal se debe de redirigir a la ruta principal, en este caso a dashboard
     * cuando la ruta es vacía, se redirige a dashboard
     */
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
