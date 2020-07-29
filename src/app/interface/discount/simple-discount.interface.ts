import {Discount} from './discount.interface';

export interface SimpleDiscount extends Discount {
  /**
   * Quantity of product items to get free items
   */
  eachItem: number;

  /**
   * Free items quantity for #eachItem
   */
  hasFreeItems: number;
}
