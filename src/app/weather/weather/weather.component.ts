import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  location$: BehaviorSubject<any>;
  currentWeather: {
    cityName: string;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    wind: {
      speed: number;
      gust: number;
      deg: number;
    };
    dt: Date;
    timezone: number;
  };

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {
    this.location$ = locationService.location$;
    console.log('weather component constructor', this.location$);
    this.locationService.getLocation().subscribe(
      (userData) => {
        let { lat, lon } = userData;
        this.weatherService.getCurrentWeather(lat, lon).subscribe(
          (weather) => {
            this.currentWeather = weather;
            this.locationService.location$.next({lat, lon});
            console.log('current weather', this.currentWeather);
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
