import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { ConfirmationComponent } from './features/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' }
];
