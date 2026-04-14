import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: '**', redirectTo: '' }
];

export const routes: Routes = [];
