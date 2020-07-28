import {SimpleDiscount} from '../discount/simple-discount.interface';

export interface Product {
  id: number;
  title: string;
  price: number;
  currency: string;
  currencySign: string;
  // TODO: add basic Discount interface with type property
  discount?: SimpleDiscount;
}
