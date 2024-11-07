import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BankingService } from '../banking/services/banking.service';

@Component({
  selector: 'app-blah',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, AsyncPipe, JsonPipe],
  providers: [BankingService],
  template: `
    <p>Demos Go Here</p>
    <div>
      <a class="link link-primary" routerLink="change-detection"
        >Change Detection</a
      >
    </div>
    <div>
      <router-outlet />
    </div>

    <pre>
            {{ req | async | json }}

        </pre
    >
  `,
  styles: ``,
})
export class DemosComponent {
  http = inject(BankingService);

  req = this.http.loadCurrentStatement();
}
