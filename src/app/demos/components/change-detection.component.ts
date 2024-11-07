import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Current is {{ current() }}</p>
    <button (click)="increment()" class="btn">Double It</button>

@if(isEven()) {
    <div  role="alert" class="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>That is an even number</span>
    </div>
} @else {
    <p>That isn't an even number</p>
}

  `,
  styles: ``,
})
export class ChangeDetectionComponent {
  current = signal(1);

  isEven = computed(() => this.current() % 2 === 0)


  increment() {
    this.current.update((c) => c + 1);
  }
}
