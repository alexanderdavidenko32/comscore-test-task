import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ShoppingCartProduct} from '../../interface/product/shopping-cart-product.interface';
import {ProductService} from '../product/product.service';
import {Product} from '../../interface/product/product.interface';
import {DiscountService} from '../discount/discount.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: BehaviorSubject<ShoppingCartProduct[]> = new BehaviorSubject([]);

  constructor(private productService: ProductService,
              private discountService: DiscountService) { }

  // TODO: refactor
  addProduct(product: Product): void {
    const products = this.products.getValue();
    let newProducts: ShoppingCartProduct[] = [];

    const foundProduct = products.find((item) => {
      return item.id === product.id;
    });


    if (foundProduct) {
      const theRestProducts = products.filter((item) => {
        return item.id !== product.id;
      }) || [];

      const tempProduct = {...foundProduct, total: 0, quantity: foundProduct.quantity + 1};

      newProducts = [...theRestProducts, {...tempProduct}];
    } else {
      const tempProduct = {...product, total: 0, quantity: 1};

      newProducts = [...products, {...tempProduct }];
    }

    console.log(newProducts);
    this.products.next(newProducts);
  }

  getTotal(products: ShoppingCartProduct[]): number {
    let total = 0;

    products.forEach((product: ShoppingCartProduct) => {
      total += this.getSubtotal(product);
    });

    return total;
  }

  getSubtotal(product: ShoppingCartProduct): number {
    if (product) {
      return this.discountService.getTotalForProduct(product);
    }

    return null;
  }

  getProducts(): Observable<ShoppingCartProduct[]> {
    return this.products;
  }
}
