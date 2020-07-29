import {Component, OnDestroy, OnInit} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Product} from '@app/interface/product';
import {DISCOUNTS} from '@app/constants';
import {ProductService} from '@app/services';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  discounts = DISCOUNTS;
  productForm = new FormGroup({});
  formErrors;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onAddProductClick(): void {
    this.formErrors = this._getFormValidationErrors(this.productForm);

    if (!this.productForm.valid) {
      return;
    }

    const product = this._populateProduct();

    this.productService.addProduct(product)
      .pipe(untilDestroyed(this))
      .subscribe(() => {});
  }


  getFormControl(name: string): FormControl {
    let formControl = this.productForm.get(name) as FormControl;

    if (formControl) {
      return formControl;
    }

    formControl = new FormControl('', Validators.required);

    this.productForm.addControl(name, formControl);

    return formControl;
  }

  isDiscountType(type: DISCOUNTS): boolean {
    return this._getDiscountType() === type;
  }

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

  private _getFormControlValue(name: string): any {
    return this.getFormControl(name) && this.getFormControl(name).value;
  }

  private _getDiscountType(): DISCOUNTS {
    return +this._getFormControlValue('discountType');
  }

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
