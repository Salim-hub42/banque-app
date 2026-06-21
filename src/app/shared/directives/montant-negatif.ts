import { Directive, input, effect , inject, ElementRef } from '@angular/core';


@Directive({
  selector: '[appMontantNegatif]',
})
export class MontantNegatif {
  montant = input<number>(0);
  private el = inject(ElementRef<HTMLElement>);

  constructor() {

    effect(() => {
      if (this.montant() < 0) {
        this.el.nativeElement.style.color = 'red';
      } else {
        this.el.nativeElement.style.color = 'green';
      }
    });
  }






  
}
