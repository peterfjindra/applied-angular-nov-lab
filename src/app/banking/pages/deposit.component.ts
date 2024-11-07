import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TransactionComponent } from '../components/transaction.component';
import { BankingStore } from '../services/banking.store';
import { CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TransactionComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  template: `
    <p>Making Deposits</p>
    <p>Your Balance is {{ bankingStore.balance() | currency }}</p>

    <form [formGroup]="form" (ngSubmit)="doDeposit(foci)">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Amount of Deposit</span>
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
              <p>You need to deposit at least a penny</p>
            }
          </div>
        }
      </label>
      <button type="submit" class="btn btn-primary">Make Deposit</button>
      <a routerLink=".." class="btn btn-warning">Cancel</a>
    </form>
  `,
  styles: ``,
})
export class DepositComponent {
  bankingStore = inject(BankingStore);

  form = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
  });

  doDeposit(focusme: HTMLInputElement) {
    if (this.form.valid) {
      const amount = this.form.controls.amount.value!;
      this.bankingStore.deposit(amount);
      this.form.reset();
      focusme.focus(); // be carefule, A11y, etc. just for a demonstration if you need it.
    } else {
      Object.keys(this.form.controls).forEach((ctrl) => {
        (ctrl as unknown as FormControl).markAsTouched({ onlySelf: true });
      });
    }
  }
}
