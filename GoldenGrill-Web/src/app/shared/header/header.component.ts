import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private cartService = inject(CartService);
  itemCount = computed(() => this.cartService.totalItems());

  openCart(): void {
    this.cartService.openCart();
  }
}
