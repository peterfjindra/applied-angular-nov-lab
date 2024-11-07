import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DecrementButtonDirective, IncrementButtonDirective } from '@shared';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <div data-testid="counter-feature-ui">
      <button
        [disabled]="store.decrementDisabled()"
        (click)="store.decrement()"
        appDecrementButton
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button appIncrementButton (click)="store.increment()">+</button>
    </div>

    <div data-testid="fizzBuzz">{{ store.fizzBuzz() }}</div>
  `,
  styles: ``,
})
export class UiComponent {
  current = signal(0);
  store = inject(CounterStore);
}
