import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  location: any;

  constructor(private locationService: LocationService) {
    // on creation of component get the default location
    locationService.location$.subscribe((location) => {
      this.location = location;
      console.log('location after subscription to behavior subject', this.location);
    });
  }

  weatherForm = new FormGroup({
    searchInput: new FormControl('', [
      Validators.required
    ])
  });

  onSubmit() {
    // if the form isn't valid don't continue
    if(this.weatherForm.invalid) return;

    // *****
    // TODO: set up check for num V string to search via ZIP or CITY NAME
    // *****

    // get zip code from input convert to number
    let userLocationInput = this.weatherForm.value.searchInput;

    // update the app state/user location so all components that subscribe have the correct info
    this.locationService.location$.next(userLocationInput);
  }
}
