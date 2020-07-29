import {TestBed} from '@angular/core/testing';

import {DiscountService} from './discount.service';
import {ShoppingCartProduct} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total for product without discount', () => {
    const product: ShoppingCartProduct = {
      id: 1,
      title: 'Popcorn',
      price: 3,
      quantity: 2
    };
    expect(service.getTotalForProduct(product)).toEqual(6);
  });

  it('should calculate total for product with simple discount', () => {
    const product: ShoppingCartProduct = {
      id: 2,
      title: 'Snickers',
      price: 4,
      quantity: 12,
      discount: {
        type: DISCOUNTS.SIMPLE_DISCOUNT,
        eachItem: 5,
        hasFreeItems: 2
      }
    };
    expect(service.getTotalForProduct(product)).toEqual(32);
  });
});
