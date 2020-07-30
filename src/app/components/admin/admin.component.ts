import {Component, OnDestroy} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';
import {ProductService} from '@app/services';
import {Router} from '@angular/router';
import {BaseFormComponent} from '@app/components/base-form/base-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseFormComponent implements OnDestroy {

  discounts = DISCOUNTS;

  constructor(private productService: ProductService,
              private router: Router) {
    super();
  }

  ngOnDestroy(): void {}

  /**
   * Add product button handler
   */
  onAddProductClick(): void {
    this.formErrors = this.getFormValidationErrors(this.formGroup);

    if (!this.formGroup.valid) {
      return;
    }

    const product = this._populateProduct();

    this.productService.addProduct(product)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }


  /**
   * Checks whether passed discount type is the same as selected on the form
   *
   * @param {DISCOUNTS} type - target type
   * @returns {boolean}
   */
  isDiscountType(type: DISCOUNTS): boolean {
    return this._getDiscountType() === type;
  }


  /**
   * Returns currently selected discount type..
   *
   * @returns {DISCOUNTS}
   * @private
   */
  private _getDiscountType(): DISCOUNTS {
    return +this.getFormControlValue('discountType');
  }

  /**
   * Creates a separate object from the form controls to save to the server.
   *
   * @returns {Product}
   * @private
   */
  private _populateProduct(): Product {
    const product: Product = {
      id: new Date().getTime(),
      title: this.getFormControlValue('title'),
      price: this.getFormControlValue('price')
    };

    if (this.isDiscountType(DISCOUNTS.SIMPLE_DISCOUNT)) {
      product.discount = {
        type: DISCOUNTS.SIMPLE_DISCOUNT,
        eachItem: +this.getFormControlValue('eachItem'),
        hasFreeItems: +this.getFormControlValue('hasFreeItems')
      };
    }

    return product;
  }
}
