import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'grounds', loadComponent: () => import('./pages/grounds/grounds.component').then(m => m.GroundsComponent) },
  { path: 'grounds/:id', loadComponent: () => import('./pages/ground-detail/ground-detail.component').then(m => m.GroundDetailComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'admin/grounds', loadComponent: () => import('./pages/admin/manage-grounds/manage-grounds.component').then(m => m.ManageGroundsComponent), canActivate: [authGuard] },
  { path: 'admin/grounds/add', loadComponent: () => import('./pages/admin/add-ground/add-ground.component').then(m => m.AddGroundComponent), canActivate: [authGuard] },
  { path: 'admin/grounds/edit/:id', loadComponent: () => import('./pages/admin/edit-ground/edit-ground.component').then(m => m.EditGroundComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
