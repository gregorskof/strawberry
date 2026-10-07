import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem, Product } from '../models/product';

const STORAGE_KEY = 'angular-test-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _items = signal<CartItem[]>(this.readCart());

  /** Readonly list of items currently in the cart. */
  readonly items = this._items.asReadonly();

  /** Total number of individual products in the cart. */
  readonly totalCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0)
  );

  /** Sum of all item prices in the cart. */
  readonly totalPrice = computed(() =>
    this.items().reduce(
      (total, item) => total + item.product.price * item.quantity, 0)
  );

  constructor() {
    // Persist the cart across navigation and page reloads.
    effect(() => this.writeCart(this._items()));
  }

  addToCart(product: Product, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: string): void {
    this._items.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._items.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  private readCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    }
    catch {
      return [];
    }
  }

  private writeCart(items: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    catch {
      // Ignore storage failures (e.g. private browsing mode).
    }
  }
}