import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationService } from '../location.service';
import { map, pluck, mergeMap, filter, toArray } from 'rxjs/operators';
import { CurrentWeather } from './current-weather';
import { of } from 'rxjs';
import { Forecast } from './forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // api docs for current weather https://openweathermap.org/current
  location: any;
  weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  apiKey = '64348c0c33e4c8b0e4f8b7d6c55e4b47';

  constructor(
    private http: HttpClient,
    private locationService: LocationService
  ) {
    locationService.location$.subscribe((location) => {
      this.location = location;
    });
  }

  getCurrentWeather(lat: any, lon: any) {
    // console.log('getCurrentWeather', location);
    return this.http
      .get<CurrentWeather>(this.weatherApiUrl, {
        params: {
          lat: lat,
          lon: lon,
          units: 'imperial',
          appid: this.apiKey,
        },
      })
      .pipe(
        // map returns an object of JUST the data I want in a key value pairing I name
        map((value) => {
          return {
            cityName: value.name,
            weather: {
              id: value.weather[0].id,
              main: value.weather[0].main,
              description: value.weather[0].description,
              icon: value.weather[0].icon,
            },
            main: {
              temp: value.main.temp,
              feels_like: value.main.feels_like,
              temp_min: value.main.temp_min,
              temp_max: value.main.temp_max,
              humidity: value.main.humidity,
            },
            wind: {
              speed: value.wind.speed,
              gust: value.wind.gust,
              deg: value.wind.deg,
            },
            dt: new Date(value.dt * 1000),
            timezone: value.timezone,
          };
        })
      );
  }

  getForecast(lat: any, lon: any) {
    //console.log('getForecast', location);
    return this.http
      .get<Forecast>(this.forecastApiUrl, {
        params: {
          lat: lat,
          lon: lon,
          units: 'imperial',
          appid: this.apiKey,
        },
      })
      .pipe(
        pluck('list'), // just get the "list" from the API endpoint
        mergeMap((value) => of(...value)), // spread out that value
        filter((value, index) => index % 8 === 0), // loop over and take every 8th one for a 5 day forecast
        map((value) => {
          // return just the data I want
          return {
            dateString: value.dt_txt, // date
            temp: value.main.temp, // temp
            weatherId: value.weather[0].id,
            weatherMain: value.weather[0].main, // main type of weather
            weatherDesc: value.weather[0].description, // a description
          };
        }),
        toArray() // push it to an array
      );
  }
}
