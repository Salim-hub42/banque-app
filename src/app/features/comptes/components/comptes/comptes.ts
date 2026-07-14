import { Component, inject } from '@angular/core';
import { CompteService } from '../../../../core/services/compte-service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-comptes',
  imports: [],
  templateUrl: './comptes.html',
  styleUrl: './comptes.scss',
})
export class Comptes {
 private compteService = inject(CompteService);
 message = inject(MessageService);

 comptes = this.compteService.comptes;
 isLoading = this.compteService.isLoading;
 error = this.compteService.error;

 constructor () {
  this.compteService.chargerComptes();
 }


}
