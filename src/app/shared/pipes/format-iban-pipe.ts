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
      // slice(i, i + 4) : extrait une tranche de la chaîne, de l'index i (inclus)
      // à i + 4 (exclu) → un morceau de 4 caractères, sans modifier ibanPropre.
      // Si la fin dépasse la longueur, slice s'arrête simplement au bout (pas d'erreur).
      // push(...) : ajoute ce morceau à la fin du tableau groupes.
      groupes.push(ibanPropre.slice(i,i + 4));
     }
    return groupes.join(' ');
  }
}
