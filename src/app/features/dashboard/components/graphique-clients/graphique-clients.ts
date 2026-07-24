import { Component, computed, inject } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { CompteService } from '../../../../core/services/compte-service';

@Component({
  selector: 'app-graphique-clients',
  imports: [UIChart],
  templateUrl: './graphique-clients.html',
  styleUrl: './graphique-clients.scss',
})
export class GraphiqueClients {
  private readonly compteService = inject(CompteService);

  comptes = this.compteService.comptes;

repartition = computed(() => {
  return this.comptes().reduce((acc, compte) => {
    acc[compte.type]++;
    return acc;
  }, { courant: 0, epargne: 0 });
});

  
  data = computed(() => ({
    labels: ['Courant', 'Épargne'],
    datasets: [
    {
      data: [this.repartition().courant, this.repartition().epargne],
      backgroundColor: ['#2D4FB2', '#E31837'],
    },
  ],

})); 

  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: { position: 'bottom' },
    },
  };
}