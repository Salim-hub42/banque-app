import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';



@Component({
  selector: 'app-detail-client',
  imports: [Button],
  templateUrl: './detail-client.html',
  styleUrl: './detail-client.scss',
})
export class DetailClient {
  private readonly router = inject(Router);
  readonly id = input<string>();

  goBack() {
    this.router.navigate(['/clients']);
  }
  
}
