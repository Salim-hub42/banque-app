import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionSolde } from './evolution-solde';

describe('EvolutionSolde', () => {
  let component: EvolutionSolde;
  let fixture: ComponentFixture<EvolutionSolde>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionSolde],
    }).compileComponents();

    fixture = TestBed.createComponent(EvolutionSolde);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
