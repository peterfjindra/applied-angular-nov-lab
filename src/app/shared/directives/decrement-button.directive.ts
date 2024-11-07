import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'button[appDecrementButton]',
})
export class DecrementButtonDirective {
  constructor(el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add(
      'btn',
      'btn-sm',
      'btn-circle',
      'btn-warning',
    );
  }
}
