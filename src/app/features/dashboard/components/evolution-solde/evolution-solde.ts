import { Component, computed, inject } from '@angular/core';
import { TransactionService } from '../../../../core/services/transaction-service';
import { UIChart } from 'primeng/chart';
import { SectionCard } from '../../../../shared/components/section-cards/section-card/section-card';

@Component({
  selector: 'app-evolution-solde',
  imports: [SectionCard, UIChart],
  templateUrl: './evolution-solde.html',
  styleUrl: './evolution-solde.scss',
})
export class EvolutionSolde {
  private readonly transactionService = inject(TransactionService);

  transactions = this.transactionService.transactions;

  constructor() {
    this.transactionService.chargerTransactions();
  }


  transactionsTriees = computed(() => {
    return [...this.transactions()].sort((a,b) => a.date.localeCompare(b.date));
  });

  soldeCumule = computed(() => {
   return this.transactionsTriees().reduce((acc, transaction) => {
      const dernierTotal = acc.length ? acc[acc.length -1] : 0;
      const variation = transaction.type === 'retrait' ? -transaction.montant : transaction.type === 'depot' ? transaction.montant : 0;
      acc.push(dernierTotal + variation);
      return acc;
    }, [] as number[])
  });

 data = computed(() => ({
    labels: this.transactionsTriees().map(t => t.date),
    datasets: [
    {
      data: this.soldeCumule(),
      borderColor: '#2D4FB2',
        fill: false,      
        tension: 0.3,
    },
  ],

})); 

  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: { display: false },
    },
    scales: { y: { suggestedMax: 2000 } } 
  };
}







