import { inject, Service, signal } from '@angular/core';
import { Compte } from '../../features/comptes/components/comptes/compte-model';
import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Service()
export class CompteService {
   private http = inject(HttpClient);
   private message = inject(MessageService);

   comptes = signal<Compte[]>([]);
   isLoading = signal(false);
   error = signal<string | null>(null);

 


   chargerComptes(clientId = '') {
      const params: Record<string, string> = clientId ? { clientId } : {};
      this.isLoading.set(true);
      this.error.set(null);
  
      this.http.get<Compte[]>('http://localhost:3000/comptes', { params })
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (comptes) => {
              this.comptes.set(comptes);
          }, 
          error: () => {
            this.error.set('Erreur lors du chargement des comptes');
            this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement des comptes' });
          },
        });
    }

    changerStatut(id: string , statut: Compte['statut']) {
           this.isLoading.set(true);
           this.error.set(null);

           this.http.patch<Compte>(`http://localhost:3000/comptes/${id}`, {statut}).pipe(
            finalize(() => this.isLoading.set(false))
           ).subscribe({
            next: (compteModifie) => {
              this.comptes.update(comptes => comptes.map(c  => c.id === id ? compteModifie : c));
              this.message.add({ severity: 'success', summary: 'Succès', detail: 'statut modifié avec succès' });
            },
             error: () => {
               this.error.set('Erreur lors de modif du statut');
               this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification du statut' });
            },
        })
    }

     ajouterCompte(nouveauCompte: Omit<Compte, 'id'>) {
        this.isLoading.set(true);
        this.error.set(null);
        
        this.http.post<Compte>('http://localhost:3000/comptes', nouveauCompte)
          .pipe(finalize(() => this.isLoading.set(false))) // finalize pour arrêter le spinner de chargement après la requête
          .subscribe({
            next: (compte) => {
              this.comptes.update(comptes => [...comptes, compte]);
              this.message.add({ severity: 'success', summary: 'Succès', detail: 'Compte ajouté avec succès' });
            },
            error: () => {
              this.error.set('Erreur lors de l\'ajout du Compte');
              this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du Compte' });
            },
          });
      }






}
