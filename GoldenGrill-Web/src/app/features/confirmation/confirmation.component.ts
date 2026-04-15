import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  private router = inject(Router);
  private cartService = inject(CartService);

  orderId = history.state?.orderId ?? null;
  total = history.state?.total ?? null;

  backToMenu(): void {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
