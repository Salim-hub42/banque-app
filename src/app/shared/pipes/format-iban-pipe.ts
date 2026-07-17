import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIban',
})
export class FormatIbanPipe implements PipeTransform {
  transform(iban: string | null | undefined): string {
     if(!iban) return '' ;
     const ibanPropre = iban.replaceAll(' ', '');

     const groupes: string[] = [];
     for(let i = 0; i < ibanPropre.length;i += 4) {
      groupes.push(ibanPropre.slice(i,i + 4));
     }
    return groupes.join(' ');
  }
}
