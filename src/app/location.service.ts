import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // default value off Ann Arbor, Michigan.
  location = {
    lat: 42.279594,
    long: -83.732124
  };
  // send location to subscribed components
  location$ = new BehaviorSubject(this.location);

  constructor() {
    // console.log('constructor in location service')
    this.getCurrentLocation();
  }

  // get current location
  getCurrentLocation() {
    console.log('trying to get location');
    window.navigator.geolocation.getCurrentPosition(
      // use lat/long if user agrees
      (location) => {
        this.location.lat = location.coords.latitude;
        this.location.long = location.coords.longitude;
        this.location$.next(this.location);
      },
      // else no default location
      (error) => {
        console.log('could not get location', error);
      }
    );
  }
}
