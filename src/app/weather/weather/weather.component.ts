import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from './../current-weather';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: {};
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
  location$: any;

  constructor( private weatherService: WeatherService ) {
    this.weatherService.currentWeather.subscribe((weatherData) => {
      this.currentWeather = weatherData;
      console.log(this.currentWeather);
    })
  }

  ngOnInit(): void { }
}
