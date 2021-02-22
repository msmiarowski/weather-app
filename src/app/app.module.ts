import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherModule } from './weather/weather.module';
import { HttpClientModule } from '@angular/common/http';
import { TuiRootModule, TuiButtonModule, iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    WeatherModule,
    HttpClientModule,
    TuiRootModule,
    TuiInputModule,
    TuiButtonModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
