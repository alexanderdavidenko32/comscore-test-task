import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {ShowcaseComponent} from './showcase.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProductService, ShoppingCartService} from '@app/services';

describe('ShowcaseComponent', () => {
  let component: ShowcaseComponent;
  let fixture: ComponentFixture<ShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot()],
      declarations: [ShowcaseComponent],
      providers: [ProductService, ShoppingCartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
