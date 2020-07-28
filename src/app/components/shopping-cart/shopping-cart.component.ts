import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ShoppingCartProduct} from '@app/interface/product/shopping-cart-product.interface';
import {ShoppingCartService} from '@app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public products: ShoppingCartProduct[];
  public total = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  public ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;

        this.total = this.shoppingCartService.getTotal(this.products);
      });
  }

  public getSubtotal(product: ShoppingCartProduct): number {
    return this.shoppingCartService.getSubtotal(product);
  }

  public ngOnDestroy(): void {}
}
