import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { TuiIslandModule } from '@taiga-ui/kit';
import { ConvertIconPipe } from './convert-icon.pipe';
import { TuiHintModule } from '@taiga-ui/core';


@NgModule({
  declarations: [WeatherComponent, ForecastComponent, ConvertIconPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    TuiIslandModule,
    TuiHintModule
  ],
  exports: [WeatherComponent, ForecastComponent]
})
export class WeatherModule { }
