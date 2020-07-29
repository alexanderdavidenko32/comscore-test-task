import { Injectable } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';

@Injectable({
  providedIn: 'root'
})
export class FakeProductStoreService {
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

  get products(): Product[] {
    return this.sessionStorageService.retrieve(this.productsKey) || this.initialProducts;
  }

  set products(products: Product[]) {
    this.sessionStorageService.store(this.productsKey, products);
  }
}
