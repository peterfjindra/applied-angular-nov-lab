import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DemosComponent } from './demos/demos.component';
import { RouterOutlet } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-nav-bar />
    <div *feature="'home-page-content'">This is something I'm working on.</div>
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavBarComponent, DemosComponent, RouterOutlet, FeatureDirective],
})
export class AppComponent {}
