import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="prose pt-12">
      <h1>Angular Starter</h1>
      <p>Using Angular 18.2.9.</p>
      <ul>
        <li>Tailwind for CSS</li>
        <li>DaisyUi for UI Library</li>
        <li>Mock Service Workers</li>
        <li>Prettier</li>
        <li>ESLint</li>
      </ul>
    </div>
  `,
  styles: ``,
})
export class WelcomeComponent {}
