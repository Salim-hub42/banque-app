import { Component, signal, computed, effect, inject } from '@angular/core';
import { Button } from 'primeng/button';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);

  estConnecte = this.authService.estConnecte;
  nomAffiche = computed(() =>  this.authService.utilisateurConnecte()?.prenom ?? 'Invité');
  nbNotifications = signal<number>(0);

  messageNotifications = computed(() => {
    const nb = this.nbNotifications();
    if (nb === 0 ) return 'Aucune notification';
    if (nb === 1 ) return '1 notification';
    return `${nb} notifications`;
  });

 
  constructor() {
  effect(() => {
    console.log(this.nbNotifications());
  })
  }
  
  ajouterNotification() {
    this.nbNotifications.update(val => val + 1);
  }

  marquerCommeLu() {
    this.nbNotifications.set(0);
  }

  menuOuvert = signal(false);

  toggleMenu() {
    this.menuOuvert.update(v => !v);
  }

  logout() {
  this.authService.logout();
}









}
