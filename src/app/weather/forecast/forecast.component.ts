import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {
    locationService.location$.subscribe(
      (location) => {
        weatherService.getForecast(location).subscribe(
          (forecast) => {
            this.forecast = forecast;
            // console.log('forecast component', this.forecast);
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
