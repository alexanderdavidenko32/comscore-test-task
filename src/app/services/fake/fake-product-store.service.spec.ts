import { TestBed } from '@angular/core/testing';

import { FakeProductStoreService } from './fake-product-store.service';

describe('FakeProductStoreService', () => {
  let service: FakeProductStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeProductStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
