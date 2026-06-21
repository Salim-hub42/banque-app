import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSolde',
})
export class FormatSoldePipe implements PipeTransform {
  transform(valeur: number, devise: string = 'EUR', locale: string = 'fr-FR'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: devise }).format(valeur);
  }
}
