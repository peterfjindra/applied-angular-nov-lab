import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-banking-transaction',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <input #amount type="number" class="input input-bordered" />
      <button (click)="doTransaction(amount)" class="btn btn-primary">
        {{ buttonLabel() }}
      </button>
    </div>
  `,
  styles: ``,
})
export class TransactionComponent {
  buttonLabel = input.required<string>();
  transactionHappened = output<number>();
  doTransaction(amount: HTMLInputElement) {
    this.transactionHappened.emit(amount.valueAsNumber);
  }
}
