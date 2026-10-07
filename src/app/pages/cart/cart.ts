import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage {
  readonly cart = inject(CartService);

  increase(productId: string): void {
    const item = this.cart.items().find((i) => i.product.id === productId);
    if (item) {
      this.cart.updateQuantity(productId, item.quantity + 1);
    }
  }

  decrease(productId: string): void {
    const item = this.cart.items().find((i) => i.product.id === productId);
    if (item) {
      this.cart.updateQuantity(productId, item.quantity - 1);
    }
  }

  remove(productId: string): void {
    this.cart.removeFromCart(productId);
  }

  clearCart(): void {
    this.cart.clearCart();
  }
}
