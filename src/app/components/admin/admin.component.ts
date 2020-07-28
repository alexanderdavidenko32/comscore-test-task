import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';
import {ProductService} from '@app/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  product: Product;
  discounts = DISCOUNTS;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.product = {
      id: new Date().getTime(),
      title: '',
      price: 0,
      discount: {
        type: DISCOUNTS.NO_DISCOUNT
      }
    };
  }

  ngOnDestroy(): void {}

  onAddProductClick(event): void {
    this.productService.addProduct(this.product)
      .pipe(untilDestroyed(this))
      .subscribe(() => {

      });
  }
}
