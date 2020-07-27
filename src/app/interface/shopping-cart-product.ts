import {Product} from './product.interface';

export interface ShoppingCartProduct extends Product {
  quantity: number;
  total: number;
}
