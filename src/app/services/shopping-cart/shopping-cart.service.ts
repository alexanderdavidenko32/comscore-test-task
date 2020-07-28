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


  /**
   * Adds a product to the shopping cart.
   *
   * @param product a product to add
   */
  addProduct(product: Product): void {
    const foundProduct = this._findProduct(product);

    let products = this.products.getValue();
    let newProducts: ShoppingCartProduct[];
    let productToAdd: ShoppingCartProduct;

    if (foundProduct) {
      products = products.filter((item) => {
        return item.id !== product.id;
      }) || [];

      productToAdd = {...foundProduct, quantity: foundProduct.quantity + 1};
    } else {
      productToAdd = {...product, quantity: 1};
    }

    newProducts = [...products, {...productToAdd}];

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

  private _findProduct(product: Product): ShoppingCartProduct {
    const products = this.products.getValue();

    return products.find((item) => {
      return item.id === product.id;
    });
  }
}
