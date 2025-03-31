import {Routes} from '@angular/router';
import {authGuard} from "./auth.guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(mod => mod.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'my-urls',
    loadComponent: () => import('./pages/my-urls/myurls.component').then(mod => mod.MyUrlsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/admin.component').then(mod => mod.AdminComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];
