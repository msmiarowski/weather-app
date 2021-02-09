import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  location$: BehaviorSubject<any>;
  forecast: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {
    this.location$ = locationService.location$;
    this.locationService.getLocation().subscribe(
      (userData) => {
        console.log(userData);
        let { lat, lon } = userData;
        this.weatherService.getForecast(lat, lon).subscribe(
          (weather) => {
            this.forecast = weather;
            console.log('current weather', this.forecast);
            this.locationService.location$.next({lat, lon});
          }
        )
      },
      (error) => {
        console.log('there was an error getting your location', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
