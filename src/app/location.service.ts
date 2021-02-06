import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  defaultLocation = ['48109', 'us']; // default value off Ann Arbor, Michigan.
  location$ = new BehaviorSubject(this.defaultLocation); // send location to subscribed components

  constructor() { }
}
