import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { DetailClient } from './detail-client';

describe('DetailClient', () => {
  let component: DetailClient;
  let fixture: ComponentFixture<DetailClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailClient],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
