import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);
  isOpen = signal(false);

  cartItems = computed(() => this.items());

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    const current = this.items();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.items.set(current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this.items.set(this.items().filter(i => i.product.id !== productId));
  }

  decreaseQuantity(productId: number): void {
    const current = this.items();
    const item = current.find(i => i.product.id === productId);
    if (!item) return;
    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      this.items.set(current.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    }
  }

  clearCart(): void {
    this.items.set([]);
  }

  openCart(): void {
    this.isOpen.set(true);
  }

  closeCart(): void {
    this.isOpen.set(false);
  }
}
