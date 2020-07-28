import { Injectable } from '@angular/core';

import {ShoppingCartProduct} from '@app/interface/product/shopping-cart-product.interface';
import {DISCOUNTS} from '@app/constants/discounts.constants';

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
    if (product.quantity >= product.discount.quantity) {
      const discountItems = Math.floor(product.quantity / product.discount.quantity);
      const restItems = product.quantity - discountItems * product.discount.quantity;

      return discountItems * (product.discount.priceForQuantity * product.price ) + restItems * product.price;
    }

    return this._calculateNoDiscount(product);
  }
}
