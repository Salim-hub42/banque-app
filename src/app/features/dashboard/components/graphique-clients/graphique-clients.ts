import { Component } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-graphique-clients',
  imports: [UIChart],
  templateUrl: './graphique-clients.html',
  styleUrl: './graphique-clients.scss',
})
export class GraphiqueClients {
  data = {
    labels: ['Courant', 'Épargne', 'Professionnel'],
    datasets: [
      {
        data: [12, 8, 3],
        backgroundColor: ['#2D4FB2', '#E31837', '#2E9E8F'],
      },
    ],
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };
}