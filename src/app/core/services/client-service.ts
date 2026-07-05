import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Client } from '../../features/clients/components/clients/client-model';
import { MessageService} from 'primeng/api';


@Service()
export class ClientService {
 
  private http = inject(HttpClient);
  private message = inject(MessageService);
 

  clients = signal<Client[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
 

  chargerClients(recherche = '') {
    const params: Record<string, string> = recherche ? { nom: recherche } : {};
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Client[]>('http://localhost:3000/clients', { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (clients) => {
            this.clients.set(clients);
        }, 
        error: () => {
          this.error.set('Erreur lors du chargement des clients');
          this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement des clients' });
        },
      });
  }

  ajouterClient(nouveauClient: Omit<Client, 'id'>) {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.http.post<Client>('http://localhost:3000/clients', nouveauClient)
      .pipe(finalize(() => this.isLoading.set(false))) // finalize pour arrêter le spinner de chargement après la requête
      .subscribe({
        next: (client) => {
          this.clients.update(clients => [...clients, client]);
          this.message.add({ severity: 'success', summary: 'Succès', detail: 'Client ajouté avec succès' });
        },
        error: () => {
          this.error.set('Erreur lors de l\'ajout du client');
          this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du client' });
        },
      });
  }

  supprimerClient (id: string) {
     this.isLoading.set(true);
     this.error.set(null);

    this.http.delete(`http://localhost:3000/clients/${id}`).pipe(
      finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.clients.update(clientActuels => clientActuels.filter(client => client.id !== id));
           this.message.add({ severity: 'success', summary: 'Succès', detail: 'Client supprimé avec succès' });
        },
        error: () => {
          this.error.set('Erreur lors de suppression du client');
          this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du client' });
        },
      }); 
  }


    modifierClient(id : string, donnees: Partial<Client>) {
    this.isLoading.set(true);
    this.error.set(null);
     
    this.http.patch<Client>(`http://localhost:3000/clients/${id}`, donnees).pipe
      (finalize(() => this.isLoading.set(false))).subscribe({
      next: (client) => {
        this.clients.update(clients => clients.map(c => c.id === id ? client : c));
        this.message.add({ severity: 'success', summary: 'Succès', detail: 'Client modifié avec succès' });
      },
        error: () => {
          this.error.set('Erreur lors de modif du client');
          this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification du client' });
        },
    })

  }
  
  //pour detail-client
  clientParId (id: Signal<string | undefined>){
    return httpResource<Client>(() => 
       id() ? `http://localhost:3000/clients/${id()}` : undefined 
    );
  }



}
