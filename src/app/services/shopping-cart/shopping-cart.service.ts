import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Product} from '../../interface/product.interface';
import {ShoppingCartProduct} from '../../interface/shopping-cart-product';
import {ProductService} from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: BehaviorSubject<ShoppingCartProduct[]> = new BehaviorSubject([]);

  constructor(private productService: ProductService) { }

  // TODO: refactor
  addProduct(id: number): void {
    const products = this.products.getValue();
    const product = this.productService.getProductById(id);
    let newProducts: ShoppingCartProduct[] = [];

    const foundProduct = products.find((item) => {
      return item.id === product.id;
    });

    if (foundProduct) {
      const theRestProducts = products.filter((item) => {
        return item.id !== product.id;
      }) || [];

      newProducts = [...theRestProducts, {...foundProduct, quantity: foundProduct.quantity + 1}];
    } else {
      newProducts = [...products, {...product, quantity: 1}];
    }

    console.log(newProducts);
    this.products.next(newProducts);
  }

  // TODO: refactor
  removeProduct(id: number): void {
    const products = this.products.getValue();
    const product = this.productService.getProductById(id);
    let newProducts: ShoppingCartProduct[] = [];

    const foundProduct = products.find((item) => {
      return item.id === product.id;
    });

    if (foundProduct && foundProduct.quantity > 1) {
      const theRestProducts = products.filter((item) => {
        return item.id !== product.id;
      }) || [];

      newProducts = [...theRestProducts, {...foundProduct, quantity: foundProduct.quantity - 1}];
    } else {
      const theRestProducts = products.filter((item) => {
        return item.id !== product.id;
      }) || [];

      newProducts = [...theRestProducts];
    }

    this.products.next(newProducts);
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }
}
