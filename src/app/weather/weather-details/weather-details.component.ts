import { Component, Input, OnInit, } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  @Input() weatherDetails: {
    feels_like: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    windDeg: number;
  };

  constructor() { }

  ngOnInit(): void {
    console.log('init', this.weatherDetails)
  }

}
