import { Component, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client-service';
import { SectionCard } from '../../../../shared/components/section-cards/section-card/section-card';
import { GraphiqueClients } from '../graphique-clients/graphique-clients';

@Component({
  selector: 'app-dashboard',
  imports: [SectionCard,GraphiqueClients],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly service = inject(ClientService);
  clients = this.service.clients;

  constructor() {
    this.service.chargerClients();
  }
   


}
