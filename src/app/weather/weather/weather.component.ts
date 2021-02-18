import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

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

  constructor( private weatherService: WeatherService ) {
    this.weatherService.currentWeather.subscribe((weatherData) => {
      this.currentWeather = weatherData;
    });
  }

  ngOnInit(): void { }
}
