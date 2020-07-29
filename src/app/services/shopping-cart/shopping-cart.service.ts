import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Product, ShoppingCartProduct} from '@app/interface';
import {DiscountService} from '@app/services/discount/discount.service';
import {ProductService} from '@app/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private products$: BehaviorSubject<ShoppingCartProduct[]> = new BehaviorSubject([]);

  constructor(private productService: ProductService,
              private discountService: DiscountService) { }


  /**
   * Adds a product to the shopping cart.
   *
   * @param product a product to add
   * @returns {Observable<ShoppingCartProduct[]>}
   */
  addProduct(product: Product): Observable<ShoppingCartProduct[]> {
    const foundProduct = this._findProduct(product);

    let products = this.products$.getValue();
    let newProducts: ShoppingCartProduct[];
    let productToAdd: ShoppingCartProduct;

    if (foundProduct) {
      products = products.filter((item) => item.id !== product.id) || [];

      productToAdd = {...foundProduct, quantity: foundProduct.quantity + 1};
    } else {
      productToAdd = {...product, quantity: 1};
    }

    newProducts = [...products, {...productToAdd}].sort( (a, b) => a.id - b.id);

    this.products$.next(newProducts);

    return this.products$;
  }

  /**
   * Removes product from the shopping cart.
   *
   * @param {ShoppingCartProduct} product
   * @returns {Observable<ShoppingCartProduct[]>}
   */
  removeProduct(product: ShoppingCartProduct): Observable<ShoppingCartProduct[]> {
    const products = this.products$.getValue();
    const newProducts = products.filter((item: ShoppingCartProduct) => item.id !== product.id);

    this.products$.next(newProducts);

    return this.products$;
  }

  /**
   * Returns total amount for all product items passed.
   *
   * @param products - target array of products
   * @returns {number}
   */
  getTotal(products: ShoppingCartProduct[]): number {
    let total = 0;

    products.forEach((product: ShoppingCartProduct) => {
      total += this.getSubtotal(product);
    });

    return total;
  }


  /**
   * Returns total amount for the product passed.
   *
   * @param product - target product
   * @returns {number}
   */
  getSubtotal(product: ShoppingCartProduct): number {
    if (product) {
      return this.discountService.getTotalForProduct(product);
    }

    return null;
  }

  /**
   * Returns count of products in passed shopping cart array.
   *
   * @param products - target products
   * @returns {number}
   */
  getQuantityTotal(products: ShoppingCartProduct[]): number {
    return products.reduce((prev: number, product: ShoppingCartProduct) => prev + product.quantity, 0);
  }

  /**
   * Returns current products list observable.
   *
   * @returns {Observable<ShoppingCartProduct[]>}
   */
  getProducts(): Observable<ShoppingCartProduct[]> {
    return this.products$;
  }

  /**
   * Finds product in the list of current products.
   *
   * @param product - product to find
   * @returns {ShoppingCartProduct}
   * @private
   */
  private _findProduct(product: Product): ShoppingCartProduct {
    const products = this.products$.getValue();

    return products.find((item) => item.id === product.id);
  }
}
