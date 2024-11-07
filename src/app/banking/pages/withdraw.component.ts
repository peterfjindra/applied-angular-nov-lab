import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BankingStore } from '../services/banking.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: `
    <p>Withdraw</p>
    <p>Your Balance is {{ bankingStore.balance() | currency }}</p>

    <form [formGroup]="form" (ngSubmit)="doDeposit(foci)">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Amount of Withdrawal</span>
        </div>
        <input
          #foci
          formControlName="amount"
          type="number"
          placeholder=""
          class="input input-bordered w-full max-w-xs"
        />
        @let amountControl = form.controls.amount;

        @if (
          amountControl.invalid &&
          (amountControl.dirty || amountControl.touched)
        ) {
          <div class="alert alert-error">
            @if (amountControl.hasError('required')) {
              <p>This is required</p>
            }
            @if (amountControl.hasError('min')) {
              <p>You need to withdrawal at least a penny</p>
            }
            @if (amountControl.hasError('max')) {
              <p>
                We don't allow overdraft, you can withdraw only up to
                {{ bankingStore.balance() | currency }}
              </p>
            }
          </div>
        }
      </label>
      <button type="submit" class="btn btn-primary">Make Withdrawal</button>
    </form>
  `,
  styles: ``,
})
export class WithdrawComponent {
  bankingStore = inject(BankingStore);

  form = new FormGroup({
    amount: new FormControl<number | null>(null, {}),
  });

  constructor() {
    effect(() => {
      this.form.controls.amount.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.max(this.bankingStore.balance()),
      ]);
    });
  }

  doDeposit(focusme: HTMLInputElement) {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const amount = this.form.controls.amount.value!;
      this.bankingStore.withdraw(amount);
      this.form.reset();
      focusme.focus(); // be carefule, A11y, etc. just for a demonstration if you need it.
    }
  }
}
