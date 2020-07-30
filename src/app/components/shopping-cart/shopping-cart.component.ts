import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {ShoppingCartProduct} from '@app/interface';
import {ShoppingCartService} from '@app/services';
import {CURRENCY_SIGN} from '@app/constants';
import {BaseFormComponent} from '@app/components/base-form/base-form.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends BaseFormComponent implements OnInit, OnDestroy {

  /**
   * List of products in shopping cart.
   */
  products: ShoppingCartProduct[];

  /**
   * Total amount charged to the user.
   */
  total = 0;

  currencySign = CURRENCY_SIGN;

  constructor(private shoppingCartService: ShoppingCartService) {
    super();
  }

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
   * Returns total for the product passed.
   *
   * @param {ShoppingCartProduct} product - product to get total
   * @returns {number}
   */
  getSubtotal(product: ShoppingCartProduct): number {
    return this.shoppingCartService.getSubtotal(product);
  }

  /**
   * Removes product from the shopping cart.
   *
   * @param {ShoppingCartProduct} product
   */
  onRemoveProduct(product: ShoppingCartProduct): void {
    this.shoppingCartService.removeProduct(product);
  }

  onUpdateProduct(product: ShoppingCartProduct): void {
    this.formErrors = this.getFormValidationErrors(this.formGroup);

    if (!this.formGroup.valid) {
      return;
    }

    const updatedProduct = {...product, quantity: +this.getFormControlValue(this.generateQuantityFieldName(product))};

    this.shoppingCartService.updateProduct(updatedProduct);
  }

  /**
   * Returns quantity field name for the form control.
   *
   * @param ShoppingCartProduct product - target product
   * @returns {string}
   */
  generateQuantityFieldName(product: ShoppingCartProduct): string {
    return 'quantity-' + product.id;
  }

}
