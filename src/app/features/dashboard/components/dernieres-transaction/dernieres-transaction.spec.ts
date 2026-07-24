import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DernieresTransaction } from './dernieres-transaction';

describe('DernieresTransaction', () => {
  let component: DernieresTransaction;
  let fixture: ComponentFixture<DernieresTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DernieresTransaction],
    }).compileComponents();

    fixture = TestBed.createComponent(DernieresTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
