import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RechercheClient } from '../recherche-client/recherche-client';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClientService } from '../../../../core/services/client-service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { form, required,  submit , FormRoot , FormField } from '@angular/forms/signals';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { Client } from './client-model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@Component({
  selector: 'app-clients',
  imports: [RechercheClient, ProgressSpinnerModule, TableModule, Button, DialogModule, FormRoot, FormField, InputText, ConfirmDialogModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
 
  private readonly router = inject(Router);
  private serviceClient = inject(ClientService);
   private confirmation = inject(ConfirmationService)

  // copie les trois signaux du service pour les utiliser dans le template
  clients = this.serviceClient.clients;
  isLoading = this.serviceClient.isLoading;
  error = this.serviceClient.error;

  // signal pour le dialog/primeNG
  dialogOuvert = signal(false);

  formModel = signal({
    nom: '',
    prenom:'',
    email: '',
    telephone: '',
    dateNaissance:'',
    adresse:'',
  });

  formDialog = form(this.formModel, (schema) => {
    required(schema.nom);
    required(schema.prenom);
    required(schema.email);
    required(schema.telephone);
    required(schema.dateNaissance);
    required(schema.adresse);
  })
   


  // le constructeur appelle la méthode pour charger les clients au démarrage du composant
  constructor() {
    this.serviceClient.chargerClients();
    //le focus de primeNG prend le decu ici !
    effect(() => {
      const input = this.champNom();
      if(input) {
        input.nativeElement.focus()
        console.log('le focus est la !')
      }
    });
  }

   // ajoute de viewChild
 champNom = viewChild<ElementRef<HTMLInputElement>>('champNom');
  

  onRechercheLancee(nouvelleRecherche: string) {
    this.serviceClient.chargerClients(nouvelleRecherche);
  }

  navigateToClientDetail(clientId: string) {
    this.router.navigate(['/clients', clientId]);
  }

 ouvrirDialog() {
    this.dialogOuvert.set(true);

 }

fermerDialog(): void {
   this.dialogOuvert.set(false);
   this.formModel.set({
     nom: '',
     prenom:'',
     email: '',
     telephone: '',
     dateNaissance:'',
     adresse:'',
   });
} 

  confirmerSuppression (client: Client) {
    this.confirmation.confirm({
      header: 'Etes vous sur ?',
      message: `Confirmer la suppression de ${client.prenom} ${client.nom}`,
      accept: () => {
         this.serviceClient.supprimerClient(client.id) 
      }
    });
  }

async onSubmit() {
  await submit(this.formDialog, async (field) => {
    this.serviceClient.ajouterClient(field().value());
    this.fermerDialog();
  });
 }



 





}
