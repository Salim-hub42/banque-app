import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueClients } from './graphique-clients';

describe('GraphiqueClients', () => {
  let component: GraphiqueClients;
  let fixture: ComponentFixture<GraphiqueClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueClients],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphiqueClients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
