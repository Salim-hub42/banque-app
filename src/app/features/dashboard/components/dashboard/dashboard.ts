import { Component, computed, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client-service';
import { SectionCard } from '../../../../shared/components/section-cards/section-card/section-card';
import { GraphiqueClients } from '../graphique-clients/graphique-clients';
import { CompteService } from '../../../../core/services/compte-service';
import { FormatSoldePipe } from '../../../../shared/pipes/format-solde-pipe';
import { GraphiqueStatus } from '../graphique-status/graphique-status';
import { EvolutionSolde } from "../evolution-solde/evolution-solde";


@Component({
  selector: 'app-dashboard',
  imports: [SectionCard, GraphiqueClients, FormatSoldePipe, GraphiqueStatus, EvolutionSolde],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly service = inject(ClientService);
  private readonly compteService = inject(CompteService);

  clients = this.service.clients;
  comptes = this.compteService.comptes;

  constructor() {
    this.service.chargerClients();
    this.compteService.chargerComptes();
  }

  soldeTotal = computed(() => {
    const initial = 0
    return this.comptes().reduce((acc , compte) => acc + compte.solde,
    initial,
  );
  })
   
  comptesActifs = computed(() => {
    return this.comptes().filter(compte => compte.statut === 'actif' ).length;
  })

}


