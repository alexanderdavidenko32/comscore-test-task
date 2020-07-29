import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface';
import {ProductService, ShoppingCartService} from '@app/services';
import {CURRENCY_SIGN} from '@app/constants';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {

  /**
   * Products list in showcase.
   */
  products: Product[];
  currencySign = CURRENCY_SIGN;

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {}


  /**
   * Add product click handler.
   *
   * @param {Event} event - mouse click/tap event
   * @param {Product} product - product to add to the shopping cart
   */
  onAddProductClick(event: Event, product: Product): void {
    event.preventDefault();

    this.shoppingCartService.addProduct(product);
  }

}
