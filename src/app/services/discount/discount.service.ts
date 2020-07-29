import { Injectable } from '@angular/core';

import {ShoppingCartProduct} from '@app/interface';
import {DISCOUNTS} from '@app/constants';
import {SimpleDiscount} from '../../interface/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }

  /**
   * Returns total price for the product in shopping cart.
   *
   * @param product - target product
   */
  getTotalForProduct(product: ShoppingCartProduct): number {
    const discountType = product.discount ? product.discount.type : DISCOUNTS.NO_DISCOUNT;

    switch (discountType) {
      case DISCOUNTS.SIMPLE_DISCOUNT:
        return this._calculateSimpleDiscount(product);
      default:
        return this._calculateNoDiscount(product);
    }
  }

  /**
   * Calculates {DISCOUNTS.NO_DISCOUNT} discount for product in shopping cart.
   *
   * @param product - target product
   * @returns {number}
   * @private
   */
  private _calculateNoDiscount(product: ShoppingCartProduct): number {
    return product.price * product.quantity;
  }

  /**
   * Calculates {DISCOUNTS.SIMPLE_DISCOUNT} discount for product in shopping cart
   *
   * @param product - target product
   * @returns {number}
   * @private
   */
  private _calculateSimpleDiscount(product: ShoppingCartProduct): number {
    const discount = product.discount as SimpleDiscount;

    if (product.quantity >= discount.eachItem) {
      const discountItems = Math.floor(product.quantity / discount.eachItem);
      const totalItems = product.quantity - discountItems * discount.hasFreeItems;

      return totalItems * product.price;
    }

    return this._calculateNoDiscount(product);
  }
}
