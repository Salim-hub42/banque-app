import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-clients',
  imports: [Button],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private router = inject(Router);

  navigateToClientDetail(clientId: string) {
    this.router.navigate(['/clients', clientId]);
  }
}
