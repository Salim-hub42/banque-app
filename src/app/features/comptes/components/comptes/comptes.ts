import { Component, inject } from '@angular/core';
import { CompteService } from '../../../../core/services/compte-service';
import { MessageService } from 'primeng/api';
import { TableModule } from "primeng/table";
import { FormatSoldePipe } from "../../../../shared/pipes/format-solde-pipe";
import {  TagModule } from "primeng/tag";
import { Compte } from './compte-model';
import { ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-comptes',
  imports: [TableModule, FormatSoldePipe, TagModule ],
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

 constructor () {
  this.compteService.chargerComptes();
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

 confirmerChangement(compte: Compte, nouveauStatut: Compte['statut']) {
    this.confirmation.confirm({
       header:' Êtes-vous sûr ? ',
       message:`Passer le compte ${compte.iban} au statut : ${nouveauStatut} ?`,
       accept: () => {
        this.compteService.changerStatut(compte.id, nouveauStatut)
       }
    })
 } 





}
