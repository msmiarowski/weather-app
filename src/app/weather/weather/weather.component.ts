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
  currentWeather: {
    cityName: string;
    weatherId: number;
    weatherMain: string;
    weatherDesc: string;
    weatherIcon: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    windDeg: number;
    dt: Date;
    timezone: number;
  };
  location$: any;

  constructor( private weatherService: WeatherService ) {
    this.weatherService.currentWeather.subscribe((weatherData) => {
      this.currentWeather = weatherData;
      console.log('weather component', this.currentWeather);
    });
  }

  ngOnInit(): void { }
}
