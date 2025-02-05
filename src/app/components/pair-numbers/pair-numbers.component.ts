import { Component, effect, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pair-numbers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pair-numbers.component.html',
  styleUrl: './pair-numbers.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PairNumbersComponent),
    multi: true
  }],
})
export class PairNumbersComponent implements ControlValueAccessor {
  maxX = input<number>(0);
  maxY = input<number>(0);

  // Form definition
  pairForm!: FormGroup;

  // Callbacks for ControlValueAccessor
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(private fb: FormBuilder) {
    this.initForm();
    this.setupValidation();
    this.handleChanges();
  }

  // Create form with validation
  private initForm() {
    this.pairForm = this.fb.group({
      x: [null, [Validators.required, Validators.max(this.maxX())]],
      y: [null, [Validators.required, Validators.max(this.maxY())]]
    });
  }

  // Update validators when maxX/maxY change
  private setupValidation() {
    effect(() => {
      this.pairForm.get('x')?.setValidators([Validators.required, Validators.max(this.maxX())]);
      this.pairForm.get('y')?.setValidators([Validators.required, Validators.max(this.maxY())]);
      this.pairForm.updateValueAndValidity();
    });
  }

  // Notify parent when form value changes
  private handleChanges() {
    this.pairForm.valueChanges.subscribe(value => {
      this.onChange(this.pairForm.valid ? value : null);
    });
  }

  // Update form when external value changes
  writeValue(value: any) {
    if (value === null) this.pairForm.reset();
    else if (value) this.pairForm.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
