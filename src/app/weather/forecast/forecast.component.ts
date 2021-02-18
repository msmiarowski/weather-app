import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { WeatherService } from '../weather.service';
import { Forecast } from './../forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<{
    dateString: number, // date
    temp: number, // temp
    weatherId: number,
    weatherMain: string, // main type of weather
    weatherDesc: string,
  }[]>;

  constructor( private weatherService: WeatherService ) {
    this.forecast$ = this.weatherService.currentForecast;
  }

  ngOnInit(): void { }
}
