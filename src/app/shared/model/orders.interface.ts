import { Product } from './product.interface';
import { products } from './products.interface';

export interface orders {
  id: number;
  userId: number | string;
  products: Product[];
  status: string;
}
