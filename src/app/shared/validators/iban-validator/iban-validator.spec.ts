import { FormControl } from '@angular/forms';

import { ibanFrancaisValidator } from './iban-validator';

describe('ibanFrancaisValidator', () => {
  it('accepte une valeur vide (le champ optionnel est valide)', () => {
    const control = new FormControl('');
    expect(ibanFrancaisValidator(control)).toBeNull();
  });

  it('accepte un IBAN français valide', () => {
    const control = new FormControl('FR1420041010050500013M02606');
    expect(ibanFrancaisValidator(control)).toBeNull();
  });

  it('accepte un IBAN français valide avec des espaces', () => {
    const control = new FormControl('FR14 2004 1010 0505 0001 3M02 606');
    expect(ibanFrancaisValidator(control)).toBeNull();
  });

  it('rejette un IBAN qui ne commence pas par FR', () => {
    const control = new FormControl('DE1420041010050500013M02606');
    expect(ibanFrancaisValidator(control)).toEqual({ ibanInvalide: true });
  });

  it('rejette un IBAN trop court', () => {
    const control = new FormControl('FR1420041010');
    expect(ibanFrancaisValidator(control)).toEqual({ ibanInvalide: true });
  });
});
