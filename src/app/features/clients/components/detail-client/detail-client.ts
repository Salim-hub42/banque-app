import { Component, input } from '@angular/core';



@Component({
  selector: 'app-detail-client',
  imports: [],
  templateUrl: './detail-client.html',
  styleUrl: './detail-client.scss',
})
export class DetailClient {

  id = input<string>();
  
}
