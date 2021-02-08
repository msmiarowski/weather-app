import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // default value off Ann Arbor, Michigan.
  location = {
    lat: 42.279594,
    lon: -83.732124
  };
  // send location to subscribed components
  location$ = new BehaviorSubject(this.location);

  constructor(private http: HttpClient) {
    this.getIp();
  }

  // get current location
  getCurrentLocation() {
    console.log('trying to get location');
    window.navigator.geolocation.getCurrentPosition(
      // use lat/long if user agrees
      (location) => {
        this.location.lat = location.coords.latitude;
        this.location.lon = location.coords.longitude;
        this.location$.next(this.location);
      },
      // else no default location
      (error) => {
        console.log('could not get location', error);
      }
    );
  }

  getIp() {
    return this.http.get<any>('http://ip-api.com/json/').subscribe(
      (userData) => {
        console.log(userData);
        this.location.lat = userData.lat;
        this.location.lon = userData.lon;
        this.location$.next(this.location);
      },
      (error) => {
        console.log('there was an error getting your location', error);
      }
    );
  }
}
