import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RxState } from '@rx-angular/state';
import { State } from './core/types/state';

export const GLOBAL_STATE = new InjectionToken<RxState<State>>('GLOBAL_STATE');

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: GLOBAL_STATE,
      useFactory: () => new RxState<State>(),
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
