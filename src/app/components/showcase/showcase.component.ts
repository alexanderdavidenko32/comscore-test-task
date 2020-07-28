import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface';
import {ProductService, ShoppingCartService} from '@app/services';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {

  products: Product[];

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.productService.getProducts()
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;
      });
  }

  public ngOnDestroy(): void {}

  public onAddProductClick(event: Event, product: Product): void {
    event.preventDefault();

    this.shoppingCartService.addProduct(product);
  }

}
