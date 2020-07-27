import { Injectable } from '@angular/core';

// TODO: use namespace @
import {Product} from '../interface/product.interface';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // todo: move to get handler/memory
  private products: BehaviorSubject<Product[]> = new BehaviorSubject([
    {
      title: 'Popcorn',
      price: 3,
      currency: 'usd'
    },
    {
      title: 'Snickers',
      price: 4,
      currency: 'usd'
    },
    {
      title: 'Soda',
      price: 2,
      currency: 'usd'
    }
  ]);

  constructor() { }

  public getProducts(): Observable<Product[]> {
    // todo: use get
    return this.products;
  }
}
