import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { ClientService } from '../../../../core/services/client-service';
import { Client } from '../clients/client-model';
import { form, required,  submit , FormRoot , FormField } from '@angular/forms/signals';



@Component({
  selector: 'app-detail-client',
  imports: [Button, FormRoot, FormField, Card, Avatar, Tag, Divider, InputText],
  templateUrl: './detail-client.html',
  styleUrl: './detail-client.scss',
})
export class DetailClient {
  private clientServives = inject(ClientService)
  private readonly router = inject(Router);
  readonly id = input<string | undefined>();

  modeEdition = signal(false);

  clientRessource = this.clientServives.clientParId(this.id);

    formModel = signal({
    nom: '',
    prenom:'',
    email: '',
    telephone: '',
    dateNaissance:'',
    adresse:'',
  });
  
   formEdition = form(this.formModel, (schema) => {
    required(schema.nom);
    required(schema.prenom);
    required(schema.email);
    required(schema.telephone);
    required(schema.dateNaissance);
    required(schema.adresse);
  })
   




 passerEnEdition(client: Client) {
   this.formModel.set({   nom: client.nom,
    prenom: client.prenom,
    email: client.email,
    telephone: client.telephone,
    dateNaissance: client.dateNaissance,
    adresse: client.adresse,
  });
   this.modeEdition.set(true);
 }

 async onSubmitEdition(){
       await submit(this.formEdition, async (field) => {
    this.clientServives.modifierClient(this.id()!, field().value());
    this.modeEdition.set(false);
    this.clientRessource.reload();
  });
 }





  goBack() {
    this.router.navigate(['/clients']);
  }
  
}
