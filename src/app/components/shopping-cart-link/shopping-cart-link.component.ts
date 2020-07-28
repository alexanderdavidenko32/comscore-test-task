import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {ShoppingCartService} from '@app/services';
import {ShoppingCartProduct} from '@app/interface';

@Component({
  selector: 'app-shopping-cart-link',
  templateUrl: './shopping-cart-link.component.html',
  styleUrls: ['./shopping-cart-link.component.scss']
})
export class ShoppingCartLinkComponent implements OnInit, OnDestroy {

  public total = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products: ShoppingCartProduct[]) => {
          this.total = this.shoppingCartService.getQuantityTotal(products);
      });
  }

  ngOnDestroy(): void {}
}
