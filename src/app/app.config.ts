import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { routes } from './app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom([ TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }, defaultLanguage: 'en'
})]), 
provideHttpClient(withInterceptorsFromDi())
]
};
