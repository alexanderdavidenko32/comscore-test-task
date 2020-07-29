import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';
import {ProductService} from '@app/services';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  discounts = DISCOUNTS;
  productForm = new FormGroup({});

  /**
   * Errors of the form to show validation.
   */
  formErrors;

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  /**
   * Add product button handler
   */
  onAddProductClick(): void {
    this.formErrors = this._getFormValidationErrors(this.productForm);

    if (!this.productForm.valid) {
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
   * Finds in existing #productForm or adds to it a form control by the name passed.
   *
   * @param {string} name - name of the form control
   * @returns {FormControl}
   */
  getFormControl(name: string): FormControl {
    let formControl = this.productForm.get(name) as FormControl;

    if (formControl) {
      return formControl;
    }

    formControl = new FormControl('', Validators.required);

    this.productForm.addControl(name, formControl);

    return formControl;
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
   * Returns form errors.
   * Could be moved to utils.
   *
   * @param {FormGroup} form - target form
   * @returns {ValidationErrors}
   * @private
   */
  private _getFormValidationErrors(form: FormGroup): ValidationErrors {
    const errors = {};

    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;

      if (controlErrors != null) {
        errors[key] = controlErrors;
      }
    });

    return errors;
  }

  /**
   * Returns value of the form control by name.
   *
   * @param {string} name - name of the form control
   * @returns {any}
   * @private
   */
  private _getFormControlValue(name: string): any {
    return this.getFormControl(name) && this.getFormControl(name).value;
  }

  /**
   * Returns currently selected discount type..
   *
   * @returns {DISCOUNTS}
   * @private
   */
  private _getDiscountType(): DISCOUNTS {
    return +this._getFormControlValue('discountType');
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
      title: this._getFormControlValue('title'),
      price: this._getFormControlValue('price')
    };

    if (this.isDiscountType(DISCOUNTS.SIMPLE_DISCOUNT)) {
      product.discount = {
        type: DISCOUNTS.SIMPLE_DISCOUNT,
        eachItem: +this._getFormControlValue('eachItem'),
        hasFreeItems: +this._getFormControlValue('hasFreeItems')
      };
    }

    return product;
  }
}
