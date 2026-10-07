import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ShopPage } from './pages/shop/shop';
import { CartPage } from './pages/cart/cart';
import { AboutPage } from './pages/about/about';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'shop', component: ShopPage },
  { path: 'cart', component: CartPage },
  { path: 'about', component: AboutPage },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '/home' },
];
