import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueStatus } from './graphique-status';

describe('GraphiqueStatus', () => {
  let component: GraphiqueStatus;
  let fixture: ComponentFixture<GraphiqueStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphiqueStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
