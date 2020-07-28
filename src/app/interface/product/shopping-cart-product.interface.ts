import {Product} from './product.interface';

export interface ShoppingCartProduct extends Product {
  /**
   * Quantity of items in shopping cart.
   */
  quantity: number;
}
