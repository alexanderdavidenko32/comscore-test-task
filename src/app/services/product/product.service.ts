import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Product} from '@app/interface/product/product.interface';
import {DISCOUNTS} from '@app/constants/discounts.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // todo: move to get handler/memory
  private products: BehaviorSubject<Product[]> = new BehaviorSubject([
    {
      id: 1,
      title: 'Popcorn',
      price: 3,
      currency: 'usd',
      currencySign: '$'
    },
    {
      id: 2,
      title: 'Snickers',
      price: 4,
      currency: 'usd',
      currencySign: '$',
      discount: {
        type: DISCOUNTS.SIMPLE_DISCOUNT,
        quantity: 5,
        priceForQuantity: 3
      }
    },
    {
      id: 3,
      title: 'Soda',
      price: 2,
      currency: 'usd',
      currencySign: '$'
    }
  ]);

  constructor() { }

  public getProducts(): Observable<Product[]> {
    // todo: use get
    return this.products;
  }

  public getProductById(id: number): Product {
    const products = this.products.getValue();

    return products.find((product) => product.id === id);
  }
}
