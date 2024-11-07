import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'button[appIncrementButton]',
})
export class IncrementButtonDirective {
  constructor(el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add(
      'btn',
      'btn-sm',
      'btn-circle',
      'btn-primary',
    );
  }
}
