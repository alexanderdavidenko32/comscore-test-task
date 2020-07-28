import { Injectable } from '@angular/core';

import {ShoppingCartProduct} from '@app/interface';
import {DISCOUNTS} from '@app/constants';
import {SimpleDiscount} from '../../interface/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }

  getTotalForProduct(product: ShoppingCartProduct): number {
    const discountType = product.discount ? product.discount.type : DISCOUNTS.NO_DISCOUNT;

    switch (discountType) {
      case DISCOUNTS.SIMPLE_DISCOUNT:
        return this._calculateSimpleDiscount(product);
      default:
        return this._calculateNoDiscount(product);
    }
  }

  private _calculateNoDiscount(product: ShoppingCartProduct): number {
    return product.price * product.quantity;
  }

  private _calculateSimpleDiscount(product: ShoppingCartProduct): number {
    const discount = product.discount as SimpleDiscount;

    if (product.quantity >= discount.quantity) {
      const discountItems = Math.floor(product.quantity / discount.quantity);
      const restItems = product.quantity - discountItems * discount.quantity;

      return discountItems * (discount.priceForQuantity * product.price ) + restItems * product.price;
    }

    return this._calculateNoDiscount(product);
  }
}
