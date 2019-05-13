import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InitComponent } from './components/init/init.component';

export const ROUTES: Routes = [
    { path: 'init', component: InitComponent },
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
