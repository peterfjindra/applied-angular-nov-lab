import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BankingStore } from '../services/banking.store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      @if (store.withdrawalAvailable()) {
        <a [routerLink]="['..', 'deposit']" class="btn btn-primary"
          >Deposit Some Money Into My Account</a
        >
        <a routerLink="../withdraw" class="btn btn-primary"
          >Withdraw Money From My Account</a
        >
      } @else {
        <p>
          It looks like you have an empty account! Why don't you make a deposit
          to get started!
        </p>

        <a [routerLink]="['..', 'deposit']" class="btn btn-primary"
          >Deposit Some Money Into My Account</a
        >
      }

      <div>
        <a routerLink="../statement" class="btn btn-primary"
          >See My Current Statement</a
        >
      </div>
    </div>
  `,
  styles: ``,
})
export class DefaultComponent {
  store = inject(BankingStore);
}
