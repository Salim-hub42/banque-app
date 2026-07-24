import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Transaction } from '../../features/dashboard/transaction-model';
import { finalize } from 'rxjs';

@Service()
export class TransactionService {
   private readonly http = inject(HttpClient);
   private message = inject(MessageService);

   transactions = signal<Transaction[]>([]);
   isLoading = signal(false);
   error = signal<string | null>(null);

   chargerTransactions() {
      this.isLoading.set(true);
      this.error.set(null);

      this.http.get<Transaction[]>('http://localhost:3000/transactions')
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
          next: (transaction) => {
            this.transactions.set(transaction)
          }, 
        error: () => {
          this.error.set('Erreur lors du chargement des transactions');
          this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement des transaction' });
        },
      });
      }
   }









