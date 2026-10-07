export interface Product {
  id: string;
  title: string;
  category: 'fresh' | 'jam' | 'marmelade';
  tag: boolean;
  price: number;
  weight: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
