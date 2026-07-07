import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontantNegatif } from './montant-negatif';

@Component({
  template: `<span appMontantNegatif [montant]="montant()">{{ montant() }}</span>`,
  imports: [MontantNegatif],
})
class HostComponent {
  montant = signal(-50);
}

describe('MontantNegatif', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('applique la couleur rouge quand le montant est négatif', () => {
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.style.color).toBe('red');
  });

  it('applique la couleur verte quand le montant est positif', async () => {
    fixture.componentInstance.montant.set(50);
    await fixture.whenStable();

    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.style.color).toBe('green');
  });
});
