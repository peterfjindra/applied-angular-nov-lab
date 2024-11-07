import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      <button
        (click)="store.setCountBy(1)"
        [disabled]="store.by() === 1"
        class="btn join-item"
      >
        1
      </button>
      <button
        (click)="store.setCountBy(3)"
        [disabled]="store.by() === 3"
        class="btn join-item"
      >
        3
      </button>
      <button
        (click)="store.setCountBy(5)"
        [disabled]="store.by() === 5"
        class="btn join-item"
      >
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
