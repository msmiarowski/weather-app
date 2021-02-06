import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
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
    locationService.location$.subscribe((location) => {
      weatherService.getCurrentWeather(location).subscribe((weather) => {
        this.currentWeather = weather;
        console.log(this.currentWeather);
      });
    });
  }

  ngOnInit(): void {

  }

}
