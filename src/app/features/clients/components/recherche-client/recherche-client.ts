import { Component, signal } from '@angular/core';
import { ClientFormsModel } from '../../client-forms-model'; 
import { form, required, minLength, submit, FormRoot, FormField ,  } from '@angular/forms/signals';

@Component({
  selector: 'app-recherche-client',
  imports: [FormRoot, FormField],
  templateUrl: './recherche-client.html',
  styleUrl: './recherche-client.scss',
})
export class RechercheClient {



  private model = signal<ClientFormsModel>({
    name: '',
    ville: '',
  });

  contactForm = form(this.model, (f) => {
    required(f.name, { message: 'Le nom est requis' });
    minLength(f.name, 2);
    required(f.ville, { message: 'La ville est requise' });
  });

  async onSubmit() {
    await submit(this.contactForm, async (field) => {
      console.log('Formulaire soumis :', field().value());
      return null;
    });
  }
}
