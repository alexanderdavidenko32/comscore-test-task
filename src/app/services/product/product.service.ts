import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Product} from '@app/interface';
import {DISCOUNTS, PRODUCTS_URL} from '@app/constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = PRODUCTS_URL;

  constructor(private http: HttpClient) { }

  /**
   * Returns products from the server (stub).
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}`);
  }
}
