import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { RechercheClient } from '../recherche-client/recherche-client';

@Component({
  selector: 'app-clients',
  imports: [Button, RechercheClient],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private readonly router = inject(Router);

  navigateToClientDetail(clientId: string) {
    console.log('Navigation vers client', clientId)
    this.router.navigate(['/clients', clientId]);
  }
}
