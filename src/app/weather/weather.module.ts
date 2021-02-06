import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { TuiIslandModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [WeatherComponent, ForecastComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TuiIslandModule
  ],
  exports: [WeatherComponent, ForecastComponent]
})
export class WeatherModule { }
