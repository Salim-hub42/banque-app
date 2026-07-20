import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ibanFrancaisValidator(control: AbstractControl): ValidationErrors | null {
  const iban = control.value as string;
  if (!iban || iban.trim() === '') return null;

  return estIbanFrancaisValide(iban) ? null : { ibanInvalide: true };
}

export function estIbanFrancaisValide(iban: string): boolean {
 const sansEspaces = iban.replace(/\s/g, '').toUpperCase();
  const ibanRegex = /^FR\d{2}[A-Z0-9]{23}$/;
  return ibanRegex.test(sansEspaces);
}