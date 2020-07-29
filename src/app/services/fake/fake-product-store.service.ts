import { Injectable } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';

/**
 * Stores the list of the products for the showcase to the session storage.
 */
@Injectable({
  providedIn: 'root'
})
export class FakeProductStoreService {

  /**
   * Key for the products list in session storage.
   */
  private productsKey = 'products';
  private initialProducts: Product[] = [
    {
      id: 1,
      title: 'Popcorn',
      price: 3
    },
    {
      id: 2,
      title: 'Snickers',
      price: 4,
      discount: {
        type: DISCOUNTS.SIMPLE_DISCOUNT,
        eachItem: 5,
        hasFreeItems: 2
      }
    },
    {
      id: 3,
      title: 'Soda',
      price: 2
    }
  ];

  constructor(private sessionStorageService: SessionStorageService) { }

  /**
   * Returns products from the session storage.
   *
   * @returns {Product[]}
   */
  get products(): Product[] {
    return this.sessionStorageService.retrieve(this.productsKey) || this.initialProducts;
  }

  /**
   * Sets products to session storage
   *
   * @param {Product[]} products
   */
  set products(products: Product[]) {
    this.sessionStorageService.store(this.productsKey, products);
  }
}
