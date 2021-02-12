import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-app';
  location$: BehaviorSubject<{}>;

  weatherForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
  });

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.location$ = this.locationService.location$;
    console.log('app component constructor', this.location$);
  }

  onSubmit() {
    // if the form isn't valid don't continue
    if (this.weatherForm.invalid) return;

    // get zip code from input convert to number
    let userLocationInput: string = this.weatherForm.value.searchInput;
    if (!Number(userLocationInput)) {
      // if string = searching by city name
      console.log(userLocationInput);
      // TODO: METHOD TO GET WEATHER BY CITY NAME
    } else {
      // searching by zip code
      console.log(Number(userLocationInput));
      // TODO: METHOD TO GET WEATHER BY ZIP CODE
    }

    // update the app state/user location so all components that subscribe have the correct info
    // this.locationService.location$.next(userLocationInput);
  }
}
