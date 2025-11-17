import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { importProvidersFrom } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockUserData } from './app/services/mocks/mock-user-data';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [ provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    MessageService,
     importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockUserData, { dataEncapsulation: false })
    ),
    providePrimeNG({
      theme: {
        preset: Aura
      },
      ripple: true
    })
  ]
}).catch(err => console.error(err));
