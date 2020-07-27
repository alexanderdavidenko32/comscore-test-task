import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ShoppingCartProduct} from '../../interface/shopping-cart-product';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public products: ShoppingCartProduct[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  public ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;
      });
  }

  public ngOnDestroy(): void {}
}
