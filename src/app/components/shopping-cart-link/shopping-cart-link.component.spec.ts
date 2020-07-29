import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {ShoppingCartLinkComponent} from './shopping-cart-link.component';

describe('ShoppingCartLinkComponent', () => {
  let component: ShoppingCartLinkComponent;
  let fixture: ComponentFixture<ShoppingCartLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot()],
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
