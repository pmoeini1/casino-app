import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { NgxsModule } from '@ngxs/store';
import { CounterState } from './state/counter.state';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(FormsModule, RouterModule),
    importProvidersFrom(
      NgxsModule.forRoot([CounterState], {
        developmentMode: true
      })
    )

  ]
};
