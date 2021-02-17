import { Component, OnInit } from '@angular/core';
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
  weatherDetails = {
    feels_like: 63,
    humidity: 33,
    windSpeed: 5,
    windGust: 12,
    windDeg: 360
  };

  constructor( private weatherService: WeatherService ) {
    this.weatherService.currentWeather.subscribe((weatherData) => {
      this.currentWeather = weatherData;
      console.log('weather component', this.currentWeather);
    });
  }

  ngOnInit(): void { console.log(this.weatherDetails) }
}
