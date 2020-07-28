import {Discount} from './discount.interface';

export interface SimpleDiscount extends Discount {
  quantity: number;
  priceForQuantity: number;
}
