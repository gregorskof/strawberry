import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  readonly cart = inject(CartService);

  navLinks = [
    { label: "Home", path: "/home", fragment: "top" },
    { label: "About", path: "/home", fragment: "about" },
    { label: "Contact", path: "/home", fragment: "contact" },
    { label: "Shop", path: "/shop" }
  ];

  isHome(): boolean {
    return !this.router.url.includes('/shop');
  }
}