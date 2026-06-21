import { Component, signal, computed, effect } from '@angular/core';
import { Button } from 'primeng/button';
import { FormatSoldePipe } from '../../pipes/format-solde-pipe';

@Component({
  selector: 'app-navbar',
  imports: [Button, FormatSoldePipe], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

 
  estConnecte = signal<boolean>(false);
  nomAffiche = computed(() => this.estConnecte() ? 'Jean Dupond' : 'Invité');
  nbNotifications = signal<number>(0);
  solde = signal<number>(12350.5);
  messageNotifications = computed(() => {
    const nb = this.nbNotifications();
    if (nb === 0 ) return 'Aucune notification';
    if (nb === 1 ) return '1 notification';
    return `${nb} notifications`;
  });

  basculerConnexion(){
    this.estConnecte.update(val => !val)
  }
  constructor() {
  effect(() => {
    console.log(this.nbNotifications());
  })
  }
  
  ajouterNotification() {
    this.nbNotifications.update(val => val + 1);
  }

  supprimerNotification() {
    this.nbNotifications.set(0);
  }








}
