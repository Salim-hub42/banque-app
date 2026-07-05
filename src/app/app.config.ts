import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import { withComponentInputBinding } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

const BofAPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#ffeaed',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#E31837',
      600: '#c0141f',
      700: '#9b0f18',
      800: '#7f0a13',
      900: '#66080f',
      950: '#4d060b',
    },
    colorScheme: {
      light: {
        surface: {
          0:   '#ffffff',
          50:  '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#cccccc',
          400: '#aaaaaa',
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#222222',
          900: '#111111',
          950: '#0a0a0a',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    MessageService,
    ConfirmationService,
    providePrimeNG({
      theme: {
        preset: BofAPreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
  ],
};
