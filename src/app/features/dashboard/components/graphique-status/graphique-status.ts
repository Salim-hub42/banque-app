import { Component, computed, inject } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { CompteService } from '../../../../core/services/compte-service';

@Component({
  selector: 'app-graphique-status',
  imports: [UIChart],
  templateUrl: './graphique-status.html',
  styleUrl: './graphique-status.scss',
})
export class GraphiqueStatus {
  private readonly compteService = inject(CompteService)
  
  comptes = this.compteService.comptes;

  repartition = computed(() => {
   return this.comptes().reduce((acc, compte) => {
    acc[compte.statut]++;
    return acc;
    }, { actif: 0, suspendu: 0 , cloture: 0 });
  });

  data = computed(() => ({
    labels: ['Actif', 'Suspendu' , 'Clôturé'],
    datasets: [
    {
      data: [this.repartition().actif, this.repartition().suspendu , this.repartition().cloture],
      backgroundColor: ['#0ca30c', '#fab219', '#898781' ],
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





