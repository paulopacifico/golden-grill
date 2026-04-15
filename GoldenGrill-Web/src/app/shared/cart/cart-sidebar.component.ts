import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html'
})
export class CartSidebarComponent {
  cartService = inject(CartService);

  isOpen = computed(() => this.cartService.isOpen());
  items = computed(() => this.cartService.cartItems());
  total = computed(() => this.cartService.totalPrice());

  close(): void {
    this.cartService.closeCart();
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
