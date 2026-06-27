import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-formulaire-client',
  imports: [ReactiveFormsModule, Button, InputTextModule],
  templateUrl: './formulaire-client.html',
  styleUrl: './formulaire-client.scss',
})
export class FormulaireClient {
  private fB = inject(FormBuilder);

  form = this.fB.group({
    nom: ['',  [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    adresse: this.fB.group({
      rue: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
})
});

get nom() {
  return this.form.get('nom');
}

get email() {
  return this.form.get('email');
}

get adresse() {
  return this.form.get('adresse') as FormGroup;
}

get rue() {
  return this.adresse.get('rue');
}

get ville() {
  return this.adresse.get('ville');
}

get codePostal() {
  return this.adresse.get('codePostal');
}

onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    console.log('Formulaire soumis avec succès :', this.form.value);

}








}
