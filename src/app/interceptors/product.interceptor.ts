import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {DISCOUNTS, PRODUCTS_URL} from '@app/constants';
import {Injectable} from '@angular/core';
import {FakeProductStoreService} from '@app/services/fake/fake-product-store.service';

/**
 * Intercepts all the requests for products.
 * Use it as a source of data when the server is not available.
 */
@Injectable()
export class ProductsInterceptor implements HttpInterceptor {
  constructor(private fakeProductStoreService: FakeProductStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== PRODUCTS_URL) {
      return next.handle(req);
    }

    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.fakeProductStoreService.products }));
    }

    if (req.method === 'POST') {
      const newProducts = [...this.fakeProductStoreService.products, req.body];
      this.fakeProductStoreService.products = newProducts;

      return of(new HttpResponse({ status: 200, body: req.body }));
    }
  }
}
