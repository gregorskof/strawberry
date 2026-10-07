import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})

export class ShopPage {
  private readonly cart = inject(CartService);
  blockedProductIds = new Set<string>();

  products: Product[] = [
    // Basket of Strawberries
    { id: 'f1', title: 'Strawberries Basket', category: 'fresh', tag: false, price: 7.50, weight: '1 kg', image: 'https://dmrqkbkq8el9i.cloudfront.net/Pictures/480xany/0/3/3/266033_msstraws_739241_crop.jpg' },
    { id: 'f2', title: 'Strawberries Basket', category: 'fresh', tag: false,  price: 4.80, weight: '500 g', image: 'https://sheelbiotech.com/wp-content/uploads/2025/11/photo-editing-12.jpg' },
    { id: 'f3', title: 'Strawberries Basket', category: 'fresh', tag: false, price: 3.20, weight: '250 g', image: 'https://myjam.co.uk/cdn/shop/products/strawberry-pack-1kg.jpg?v=1643315449&width=1500' },
    
    // Example with no image... It uses an icon instead.
    { id: 'f4', title: 'No Image Strawberry', category: 'fresh', tag: true, price: 0.00, weight: '0 g', image: '' },
    
    // Jam made of Strawberries
    { id: 'j1', title: 'Strawberry Jam', category: 'jam', tag: false, price: 8.50, weight: '250 g', image: 'https://fountainavenuekitchen.com/wp-content/uploads/2012/05/IMG_3775.jpg' },
    { id: 'j2', title: 'Strawberry Jam', category: 'jam', tag: false, price: 4.50, weight: '180 g', image: 'https://bitesbybianca.com/wp-content/uploads/2024/06/homemade-strawberry-jam-3.jpg' },
    { id: 'j3', title: 'Strawberry Jam', category: 'jam', tag: false, price: 3.20, weight: '100 g', image: 'https://veggiefunkitchen.com/wp-content/uploads/2023/09/Strawberry-Jam2033.jpg' },
    
    // Marmelade made of Strawberries
    { id: 'm1', title: 'Strawberry Marmalade', category: 'marmelade', tag: false, price: 5.20, weight: '250 g', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCit8qEISWrVzzRkiOSpdTPT198RFw1qzc-0yvqJ0xA8x6-U38xIEVCizz&s=10' },
    { id: 'm2', title: 'Strawberry Marmalade', category: 'marmelade', tag: false, price: 4.20, weight: '180 g', image: 'https://itsnotcomplicatedrecipes.com/wp-content/uploads/2022/01/Strawberry-Jam-1.jpg' },
    { id: 'm3', title: 'Strawberry Marmalade', category: 'marmelade', tag: false, price: 3.00, weight: '100 g', image: 'https://preppykitchen.com/wp-content/uploads/2021/08/Strawberry-Jam-Feature.jpg' }
  ];

  addToCart(product: Product) {
    // If product tag is found, disable adding to cart option for it
    if (product.tag === true) {
      this.blockedProductIds.add(product.id);
      console.log("This product can't be added to cart.");
    } else {
      this.cart.addToCart(product);
    }
  }

  isInCart(productId: string): boolean {
    return this.cart.items().some((item) => item.product.id === productId);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}