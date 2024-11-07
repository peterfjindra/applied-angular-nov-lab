import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BankingStore } from '../services/banking.store';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, CurrencyPipe, TitleCasePipe],
  template: ` <div class="overflow-x-auto">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>Date of Transaction</th>
          <th>Type</th>
          <th>Amount</th>
          <th>New Balance</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->

        @for (record of store.entities(); track record.id) {
          <tr>
            <th>{{ record.date | date: 'short' }}</th>
            <td>{{ record.kind | titlecase }}</td>
            <td>
              {{ record.amount | currency }}
              @if (record.isPending) {
                <span>(pending!)</span>
              }
            </td>
            <td>{{ record.newBalance | currency }}</td>
          </tr>
        } @empty {
          <p>You have no transactions!</p>
        }
        <!-- row 2 -->
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class StatementComponent {
  // private bankingService:BankingService;
  // constructor(bankingService:BankingService) {
  //     this.bankingService = bankingService
  // }
  //constructor(private bankingService:BankingStore) {}
  store = inject(BankingStore);
}
