import {Discount} from './discount.interface';

export interface SimpleDiscount extends Discount {
  /**
   * Quantity of product items to calculate as #priceForQuantity
   */
  quantity: number;

  /**
   * Price for #quantity of products should be calculated as price for #priceForQuantity products count
   */
  priceForQuantity: number;
}
