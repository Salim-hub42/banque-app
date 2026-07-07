import { TestBed } from '@angular/core/testing';
import { ClientService } from './client-service';
import { provideHttpClient   } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';


describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  let message: MessageService;

 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('charge les clients depuis le serveur', () => {
    service.chargerClients();

    const requete = httpMock.expectOne('http://localhost:3000/clients');
    expect(requete.request.method).toBe('GET');

    requete.flush([{id: '1', nom: 'Dupont', prenom: 'Jean', email: '', telephone: '', dateNaissance: '', adresse: ''}]);
    
      expect(service.clients()).toHaveLength(1);
      expect(service.clients()[0].nom).toBe('Dupont');
  });
  afterEach(() => httpMock.verify())
});
