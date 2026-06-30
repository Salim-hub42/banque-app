import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../models/utilisateur.model';

@Service()
export class AuthService {
   private http = inject(HttpClient);
   private router = inject(Router);

   utilisateurConnecte = signal<Utilisateur | null>(
    JSON.parse(localStorage.getItem('utilisateur') ?? 'null')
  );

   estConnecte = computed(() => this.utilisateurConnecte() !== null);

   login(email: string, password: string) {
     this.http.get<Utilisateur[]>(`http://localhost:3000/utilisateurs?email=${email}&password=${password}`).subscribe(users => {
      if (users.length > 0) {
         this.utilisateurConnecte.set(users[0]);
         localStorage.setItem('utilisateur', JSON.stringify(users[0]));
         this.router.navigate(['/dashboard']);
      }
     });
   }

   logout() {
       this.utilisateurConnecte.set(null);
       localStorage.removeItem('utilisateur');
       this.router.navigate(['/login']);
   }













}
