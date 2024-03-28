import { Product } from './product.interface';

export interface orders {
  id: number;
  userId: number | string;
  products: Product[];
  status: string;
}
