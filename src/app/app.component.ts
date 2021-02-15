import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from './location.service';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-app';
  userInput: string = '';

  weatherForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
  });

  constructor( private weatherService: WeatherService ) {
    // get default location
    this.weatherService.getDefaultLocation().subscribe((location) => {
      this.updateWeather(location);
    });
  }

  ngOnInit() { }

  onSubmit() {
    // if the form isn't valid don't continue
    if (this.weatherForm.invalid) return;

    // get value from input
    this.userInput = this.weatherForm.value.searchInput;

    // if value = string searching by city name
    if (!Number(this.userInput)) {
      let queryData = { 'q': this.userInput }
      this.updateWeather(queryData);
    } else {
      // searching by zip code
      let queryData = { 'zip': this.userInput }
      this.updateWeather(queryData);
    }
  }

  updateWeather(locationData: {}) {
    // pass new location object so subscribers have it: object
    this.weatherService.location$.next(locationData);
    // new weather data : object
    this.weatherService.getCurrentWeather(locationData);
    // new forecast data : array of objects
    this.weatherService.getForecast(locationData).subscribe((forecast) => {
      this.weatherService.currentForecast$.next(forecast);
    });
  }
}
