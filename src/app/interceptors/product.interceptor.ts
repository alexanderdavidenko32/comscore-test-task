import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {DISCOUNTS, PRODUCTS_URL} from '@app/constants';

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
    if (req.url === PRODUCTS_URL) {
      return of(new HttpResponse({ status: 200, body: this.responseBody }));
    }

    return next.handle(req);
  }
}
