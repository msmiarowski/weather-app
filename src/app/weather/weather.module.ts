import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { TuiIslandModule, TuiAccordionModule } from '@taiga-ui/kit';
import { ConvertIconPipe } from './convert-icon.pipe';
import { TuiHintModule } from '@taiga-ui/core';
import { ConvertDegreePipe } from './convert-degree.pipe';


@NgModule({
  declarations: [WeatherComponent, ForecastComponent, ConvertIconPipe, ConvertDegreePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    TuiIslandModule,
    TuiHintModule,
    TuiAccordionModule
  ],
  exports: [WeatherComponent, ForecastComponent]
})
export class WeatherModule { }
