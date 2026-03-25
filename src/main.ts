import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { serverRoutes } from './app/app.routes.server';
import { routes } from './app/app.routes';  

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
