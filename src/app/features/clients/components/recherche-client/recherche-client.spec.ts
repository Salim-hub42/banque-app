import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheClient } from './recherche-client';

describe('RechercheClient', () => {
  let component: RechercheClient;
  let fixture: ComponentFixture<RechercheClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheClient],
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
