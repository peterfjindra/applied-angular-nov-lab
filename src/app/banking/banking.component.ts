import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankingStore } from './services/banking.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-banking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CurrencyPipe],
  template: `
    @if (store.error()) {
      <div role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
    }
    @if (store.isFulfilled()) {
      <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Your Account</h2>
          <p>
            You Currently have a Balance of {{ store.balance() | currency }}
          </p>
        </div>
      </div>
      <router-outlet />
    } @else {
      <p>
        <span class="loading loading-spinner text-info"></span>We are getting
        your latest statement! Stand by!
      </p>
    }
  `,
  styles: ``,
})
export class BankingComponent {
  store = inject(BankingStore);

  constructor() {
    // this.store.load();
  }
}
