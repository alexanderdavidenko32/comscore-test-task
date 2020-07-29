import { TestBed } from '@angular/core/testing';
import {NgxWebstorageModule} from 'ngx-webstorage';

import { FakeProductStoreService } from './fake-product-store.service';

describe('FakeProductStoreService', () => {
  let service: FakeProductStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxWebstorageModule.forRoot()]
    });
    service = TestBed.inject(FakeProductStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set value', () => {
    service.products = [
      {
        id: 3,
        title: 'Soda',
        price: 2
      }
    ];

    expect(service.products[0].id).toEqual(3);
  });
});
