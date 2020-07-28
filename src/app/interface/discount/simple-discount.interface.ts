import {Discount} from './discount.interface';

export interface SimpleDiscount extends Discount {
  /**
   * Quantity of product items to calculate as #applyAsQuantity
   */
  quantity: number;

  /**
   * Price for #quantity of products should be calculated as price for #applyAsQuantity products count
   */
  applyAsQuantity: number;
}
