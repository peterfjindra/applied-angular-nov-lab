import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Working on the upgraded counter stuff here</p> `,
  styles: ``,
})
export class CounterComponent {}
