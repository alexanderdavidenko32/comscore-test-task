import { Component, OnInit } from '@angular/core';

import {Product} from '../../interface/product.interface';
import {ProductService} from '../../services/product/product.service';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      //TODO
      // .pipe(
      //   untilDestroyed(this)
      // )
      .subscribe((products) => {
        this.products = products;
      });
  }

  public onAddProductClick(event: Event, id: number): void {
    event.preventDefault();

    this.shoppingCartService.addProduct(id);
  }

}
