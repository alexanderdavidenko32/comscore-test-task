import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ShoppingCartService} from './shopping-cart.service';
import {DiscountService, ProductService} from '@app/services';
import {Product, ShoppingCartProduct} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  const shoppingCartProducts: ShoppingCartProduct[] = [
      {
        id: 1,
        title: 'Popcorn',
        price: 3,
        quantity: 1
      },
      {
        id: 2,
        title: 'Snickers',
        price: 4,
        quantity: 2,
        discount: {
          type: DISCOUNTS.SIMPLE_DISCOUNT,
          quantity: 5,
          applyAsQuantity: 3
        }
      },
      {
        id: 3,
        title: 'Soda',
        price: 2,
        quantity: 1
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, DiscountService],
    });
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it ('should add item to cart', () => {
    const product: Product = {
      id: 1,
      title: 'Popcorn',
      price: 3
    };

    service.addProduct(product).subscribe((products) => {
      expect(products.length).toEqual(1);
    });
  });

  it ('should return products', () => {
    const product: Product = {
      id: 1,
      title: 'Popcorn',
      price: 3
    };

    service.addProduct(product);

    service.getProducts().subscribe((products) => {
      expect(products.length).toEqual(1);
    });
  });

  it ('should return total amount', () => {
    expect(service.getTotal(shoppingCartProducts)).toEqual(13);
  });

  it ('should return total amount', () => {
    const product = shoppingCartProducts[0];

    expect(service.getSubtotal(product)).toEqual(3);
  });

  it ('should return total amount', () => {
    expect(service.getQuantityTotal(shoppingCartProducts)).toEqual(4);
  });
});
