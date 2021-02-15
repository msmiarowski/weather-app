import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // default value off Ann Arbor, Michigan. LAT: 42.279594, LON:  -83.732124
  queryConfig = {
    units: 'imperial',
    appid: '64348c0c33e4c8b0e4f8b7d6c55e4b47',
  };
  // send location to subscribed components
  location$ = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  updateLocation(value: any) {
    let newLocation = Object.assign(value, this.queryConfig);
    this.location$.next(newLocation);
  }

  /*
    GET USER'S LOCATION W/ THE WINDOW GEO LOCATION
    -- NEEDS USERS PERMISSION
  */
  // getCurrentLocation() {
  //   console.log('trying to get location');
  //   window.navigator.geolocation.getCurrentPosition(
  //     // use lat/long if user agrees
  //     (location) => {
  //       this.location.lat = location.coords.latitude;
  //       this.location.lon = location.coords.longitude;
  //       this.location$.next(this.location);
  //     },
  //     // else no default location
  //     (error) => {
  //       console.log('could not get location', error);
  //     }
  //   );
  // }

  getLocation(): Observable<any> {
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
}
