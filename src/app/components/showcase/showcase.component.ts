import { Component, OnInit } from '@angular/core';

import {Product} from '../../interface/product.interface';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {}

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

}
