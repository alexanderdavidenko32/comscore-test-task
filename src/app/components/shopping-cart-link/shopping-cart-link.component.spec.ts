import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingCartLinkComponent} from './shopping-cart-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ShoppingCartLinkComponent', () => {
  let component: ShoppingCartLinkComponent;
  let fixture: ComponentFixture<ShoppingCartLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ShoppingCartLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
