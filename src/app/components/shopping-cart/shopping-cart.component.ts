import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {ShoppingCartProduct} from '@app/interface';
import {ShoppingCartService} from '@app/services';
import {CURRENCY_SIGN} from '@app/constants';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  /**
   * List of products in shopping cart.
   */
  products: ShoppingCartProduct[];

  /**
   * Total amount charged to the user.
   */
  total = 0;

  currencySign = CURRENCY_SIGN;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;

        this.total = this.shoppingCartService.getTotal(this.products);
      });
  }

  ngOnDestroy(): void {}

  /**
   * Returns total for the product passed
   * @param product - product to get total
   */
  getSubtotal(product: ShoppingCartProduct): number {
    return this.shoppingCartService.getSubtotal(product);
  }

}
