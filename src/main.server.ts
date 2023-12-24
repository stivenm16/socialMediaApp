import { bootstrapApplication } from '@angular/platform-browser';
import 'localstorage-polyfill';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

global['localStorage'] = localStorage;

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
