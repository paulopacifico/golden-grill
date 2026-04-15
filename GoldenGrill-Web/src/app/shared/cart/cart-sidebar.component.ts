import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html'
})
export class CartSidebarComponent {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  isOpen = computed(() => this.cartService.isOpen());
  items = computed(() => this.cartService.cartItems());
  total = computed(() => this.cartService.totalPrice());
  placing = signal(false);
  errorMessage = signal('');

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

  placeOrder(): void {
    if (this.placing()) return;
    this.placing.set(true);
    this.errorMessage.set('');

    const request = {
      items: this.items().map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        unitPrice: i.product.price,
        quantity: i.quantity
      }))
    };

    this.orderService.placeOrder(request).subscribe({
      next: (order) => {
        this.cartService.closeCart();
        this.cartService.clearCart();
        this.router.navigate(['/confirmation'], {
          state: { orderId: order.id, total: order.totalPrice }
        });
      },
      error: () => {
        this.errorMessage.set('Não foi possível finalizar o pedido. Tente novamente.');
        this.placing.set(false);
      }
    });
  }
}
