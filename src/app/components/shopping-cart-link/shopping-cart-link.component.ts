import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {Product} from '../../interface/product.interface';
import {ShoppingCartProduct} from '../../interface/shopping-cart-product';

@Component({
  selector: 'app-shopping-cart-link',
  templateUrl: './shopping-cart-link.component.html',
  styleUrls: ['./shopping-cart-link.component.scss']
})
export class ShoppingCartLinkComponent implements OnInit {

  public total = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts()
      .pipe(
        // untilDestroyed(this)
      ).subscribe((products: ShoppingCartProduct[]) => {
          let total = 0;

          products.forEach((product: ShoppingCartProduct) => {
            total += product.quantity;
          });

          this.total = total;
      });
  }

}
