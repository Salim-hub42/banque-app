import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanValidator } from './iban-validator';

describe('IbanValidator', () => {
  let component: IbanValidator;
  let fixture: ComponentFixture<IbanValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IbanValidator],
    }).compileComponents();

    fixture = TestBed.createComponent(IbanValidator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
