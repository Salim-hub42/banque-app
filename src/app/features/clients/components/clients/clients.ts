import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RechercheClient } from '../recherche-client/recherche-client';
import { Client } from './client-model';
import { httpResource } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-clients',
  imports: [RechercheClient, ProgressSpinnerModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private readonly router = inject(Router);

  recherche = signal('');

  clients = httpResource<Client[]>(() => {
    const q = this.recherche();
    return q ? `http://localhost:3000/clients?nom=${q}` : 'http://localhost:3000/clients';
  });

  onRechercheLancee(nouvelleRecherche: string) {
    this.recherche.set(nouvelleRecherche);
  }

  navigateToClientDetail(clientId: string) {
    this.router.navigate(['/clients', clientId]);
  }
}
