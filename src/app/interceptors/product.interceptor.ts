import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {DISCOUNTS, PRODUCTS_URL} from '@app/constants';

/**
 * Intercepts all the requests for products.
 * Use it as a source of data when the server is not available.
 */
export class ProductsInterceptor implements HttpInterceptor {

  private responseBody = [
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
        quantity: 5,
        priceForQuantity: 3
      }
    },
    {
      id: 3,
      title: 'Soda',
      price: 2
    }
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== PRODUCTS_URL) {
      return next.handle(req);
    }

    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.responseBody }));
    }

    if (req.method === 'POST') {
      this.responseBody.push(req.body);
      return of(new HttpResponse({ status: 200, body: req.body }));
    }

  }
}
