import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CartSidebarComponent } from './shared/cart/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CartSidebarComponent],
  template: `
    <app-header />
    <router-outlet />
    <app-cart-sidebar />
  `
})
export class App {}
