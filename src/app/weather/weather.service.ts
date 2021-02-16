import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationService } from '../location.service';
import { map, pluck, mergeMap, filter, toArray } from 'rxjs/operators';
import { CurrentWeather } from './current-weather';
import { BehaviorSubject, of, Observable, Subject } from 'rxjs';
import { Forecast } from './forecast';

interface WeatherApiInterface {
    name: string;
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
    dt: number;
    timezone: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // api docs for current weather https://openweathermap.org/current
  location$ = new BehaviorSubject(<any>{});
  location = this.location$.asObservable();

  currentWeather$ = new BehaviorSubject<CurrentWeather>(<CurrentWeather>{});
  currentWeather = this.currentWeather$.asObservable();

  currentForecast$ = new BehaviorSubject(<any>[]);
  currentForecast = this.currentForecast$.asObservable();

  weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  queryConfig = {
    units: 'imperial',
    appid: '64348c0c33e4c8b0e4f8b7d6c55e4b47', // api key
  };

  constructor( private http: HttpClient ) { }

  getDefaultLocation(): Observable<any> {
    // get user's ip address then lat/lon
    return this.http.get<any>('http://ip-api.com/json/').pipe(
      map((value) => {
        return {
          lat: value.lat,
          lon: value.lon,
        };
      })
    );
  }

  getCurrentWeather(location: {}) {
    return this.http
      .get<WeatherApiInterface>(this.weatherApiUrl, {
        params: this.queryParams(location)
      })
      .pipe(
        // map returns an object of JUST the data I want in a key value pairing I name
        map((value) => {
          return {
            cityName: value.name,
            weatherId: value.weather[0].id,
            weatherMain: value.weather[0].main,
            weatherDesc: value.weather[0].description,
            weatherIcon: value.weather[0].icon,
            temp: value.main.temp,
            feels_like: value.main.feels_like,
            temp_min: value.main.temp_min,
            temp_max: value.main.temp_max,
            humidity: value.main.humidity,
            windSpeed: value.wind.speed,
            windGust: value.wind.gust,
            windDeg: value.wind.deg,
            dt: new Date(value.dt * 1000),
            timezone: value.timezone,
          };
        })
      ).subscribe((weather) => {
        this.currentWeather$.next(weather);
      })
  }

  getForecast(location: {}) {
    return this.http
      .get<Forecast>(this.forecastApiUrl, {
        params: this.queryParams(location)
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

  queryParams(location: {}) {
    // combine lat/long OR zip OR cityName with the queryConfig
    // this makes our query params to the weather API
    return Object.assign(location, this.queryConfig);
  }
}
