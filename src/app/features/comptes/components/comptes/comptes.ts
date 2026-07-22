import { Component, inject, signal } from '@angular/core';
import { CompteService } from '../../../../core/services/compte-service';
import { MessageService } from 'primeng/api';
import { TableModule } from "primeng/table";
import { FormatSoldePipe } from "../../../../shared/pipes/format-solde-pipe";
import {  TagModule } from "primeng/tag";
import { Compte } from './compte-model';
import { ConfirmationService } from 'primeng/api';
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";
import { FormatIbanPipe } from '../../../../shared/pipes/format-iban-pipe';
import { ClientService } from '../../../../core/services/client-service';
import { form, FormField, FormRoot, required, submit, validate } from '@angular/forms/signals';
import { estIbanFrancaisValide } from '../../../../shared/validators/iban-validator/iban-validator';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';



@Component({
  selector: 'app-comptes',
  imports: [TableModule, FormatSoldePipe, TagModule, Button, ConfirmDialog, FormatIbanPipe, Dialog , FormRoot , FormField , Select , InputNumber , InputMask , FormsModule, InputText   ],
  templateUrl: './comptes.html',
  styleUrl: './comptes.scss',
})
export class Comptes {
 private compteService = inject(CompteService);
 message = inject(MessageService);
 confirmation = inject(ConfirmationService)

 comptes = this.compteService.comptes;
 isLoading = this.compteService.isLoading;
 error = this.compteService.error;

 private clientService = inject(ClientService);
 clients = this.clientService.clients;

   // signal pour le dialog/primeNG
 dialogOuvert = signal(false);

 constructor () {
  this.compteService.chargerComptes();
  this.clientService.chargerClients();
 }
  





 
 severiteStatut(statut: Compte['statut']) {
    switch (statut) {
      case 'actif':
        return 'success'
      case 'suspendu':
        return 'warn'
      case 'cloture':
        return 'secondary'
    }
 }
  // fonction de typage car ng-template sera any sinon !
  asCompte(compte: unknown): Compte {
    return compte as Compte;
}

 confirmerChangement(compte: Compte, nouveauStatut: Compte['statut']) {
    this.confirmation.confirm({
       header:' Êtes-vous sûr ? ',
       message:`Passer le compte ${compte.iban} au statut : ${nouveauStatut} ?`,
       accept: () => {
        this.compteService.changerStatut(compte.id, nouveauStatut)
       }
    })
 } 

  typeDisponibles: Compte['type'][] = ['courant','epargne'];

  formModel = signal<Pick<Compte, 'clientId' | 'type' | 'solde' | 'iban'>>({
  clientId: '',
  type: 'courant',
  solde: 0,
  iban:'',
 });

 //faire le formSignal
 formCompte = form(this.formModel, (cpt) => {
    required(cpt.clientId);
    required(cpt.iban);
    validate(cpt.iban, ctx => estIbanFrancaisValide(ctx.value()) ? null : { kind: 'iban' } );
    required(cpt.solde);
    required(cpt.type);
 })

 ouvrirDialog() {
  this.dialogOuvert.set(true);
 }

 fermerDialog() {
  this.dialogOuvert.set(false);
  this.formModel.set({
     clientId: '',
     type: 'courant',
     solde: 0,
     iban:'',
  })
 }

async onSubmit() {
  await submit(this.formCompte, async (field) => {
    const ajout:Omit<Compte, 'id'> = {
      ...field().value(),
     statut: 'actif',
     dateOuverture: new Date().toISOString().slice(0, 10)
    };
    this.compteService.ajouterCompte(ajout);
    this.fermerDialog();
  });
 }

}



