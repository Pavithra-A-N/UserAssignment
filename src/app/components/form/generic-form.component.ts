import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { VALIDATION_MESSAGES, ValidationMessageMap} from './validation-message';
import { User } from '../../services/models/user.model';
@Component({
  selector: 'app-generic-form',
  standalone:true,
  imports:[SelectModule, ReactiveFormsModule, InputTextModule, CommonModule],
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent implements OnChanges{
  @Input() formGroup!: FormGroup;
  @Input() config: any[] = [];
  @Input() data:any = null;
  @Output() formSubmit = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data && this.formGroup) {
      this.formGroup.patchValue(this.data);
    }
  }
  // triggers form submission without the button element
  public triggerFormSubmission(): boolean {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
      return true;
    } else {
      this.formGroup.markAllAsTouched();
      return false;
    }
  }
  // handles form Validation error messages
  getValidationErrorMessage(controlName: string, label: string): string {
    const control = this.formGroup.get(controlName);
    if (!control || !control.errors) {
      return '';
    }
    const errors = control.errors;
    const firstErrorKey = Object.keys(errors)[0];
    const errorFn = VALIDATION_MESSAGES[firstErrorKey as keyof ValidationMessageMap];

    if (errorFn) {
      if (firstErrorKey === 'minlength' || firstErrorKey === 'maxlength') {
        const requiredLength = errors[firstErrorKey].requiredLength;
        return (errorFn as (label: string, length: number) => string)(label, requiredLength);
      }
      return (errorFn as (label: string) => string)(label);
    }

    return `${label} has an unknown validation error.`;
  }

}
