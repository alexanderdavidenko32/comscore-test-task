import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent {

  formGroup = new FormGroup({});

  /**
   * Errors of the form to show validation.
   */
  formErrors: ValidationErrors = {};

  /**
   * Returns form errors.
   * Could be moved to utils.
   *
   * @param {FormGroup} form - target form
   * @returns {ValidationErrors}
   * @private
   */
  getFormValidationErrors(form: FormGroup): ValidationErrors {
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
   * Finds in existing #formGroup or adds to it a form control by the name passed.
   *
   * @param {string} name - name of the form control
   * @param {any} value - initial value
   * @returns {FormControl}
   */
  getFormControl(name: string, value: any = ''): FormControl {
    let formControl = this.formGroup.get(name) as FormControl;

    if (formControl) {
      return formControl;
    }

    formControl = new FormControl(value, Validators.required);

    this.formGroup.addControl(name, formControl);

    return formControl;
  }


  /**
   * Returns value of the form control by name.
   *
   * @param {string} name - name of the form control
   * @returns {any}
   * @private
   */
  getFormControlValue(name: string): any {
    return this.getFormControl(name) && this.getFormControl(name).value;
  }
}
