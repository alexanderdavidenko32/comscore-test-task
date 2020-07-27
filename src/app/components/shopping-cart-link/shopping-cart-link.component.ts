import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {ShoppingCartProduct} from '../../interface/shopping-cart-product';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-shopping-cart-link',
  templateUrl: './shopping-cart-link.component.html',
  styleUrls: ['./shopping-cart-link.component.scss']
})
export class ShoppingCartLinkComponent implements OnInit, OnDestroy {

  public total = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  public ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products: ShoppingCartProduct[]) => {
          let total = 0;

          products.forEach((product: ShoppingCartProduct) => {
            total += product.quantity;
          });

          this.total = total;
      });
  }


  public ngOnDestroy(): void {}
}
