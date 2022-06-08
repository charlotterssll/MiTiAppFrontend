import { Component } from '@angular/core';
import { MitiService } from '../miti-service/miti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createmiti',
  templateUrl: './create-miti.component.html',
  styleUrls: ['./create-miti.component.css'],
})
export class CreateMitiComponent {
  locality?: string;
  location?: string;
  street?: string;
  firstName?: string;
  lastName?: string;
  abbreviation?: string;
  time?: string;
  date?: string;
  alertNull?: string;
  alertLocality?: string;
  alertLocation?: string;
  alertStreet?: string;
  alertFirstName?: string;
  alertLastName?: string;
  alertAbbreviation?: string;
  alertTime?: string;
  alertDate?: string;
  alertMitiAlreadyExists?: string;

  constructor(private mitiService: MitiService, private router: Router) {}

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.street ||
      !this.firstName ||
      !this.lastName ||
      !this.abbreviation ||
      !this.time ||
      !this.date
    ) {
      this.alertNull = 'Null values in any form fields are disallowed';
      console.log('Null values in any form fields are disallowed');
    } else {
      this.youShallMeetRegexPattern();
    }
  }

  youShallMeetRegexPattern() {
    let flag1;
    let flag2;
    let flag3;
    let flag4;
    let flag5;
    let flag6;
    let flag7;
    let flag8;
    const regexPatternPlaceName = new RegExp(
      '[A-ZÄÖÜ][a-zäöüß-]+(\\s[A-ZÄÖÜ][a-zäöüß-]+)*'
    );
    const regexPatternAbbreviation = new RegExp('^[A-ZÄÖÜ]{3}$');
    const regexPatternTime = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    const regexPatternDate = new RegExp(
      '^\\s*((?:19|20)\\d{2})\\-(1[012]|0?[1-9])\\-(3[01]|[12][0-9]|0?[1-9])\\s*$'
    );
    switch (regexPatternPlaceName.test(<string>this.locality)) {
      case false:
        this.alertLocality =
          'Locality must only contain letters and begin with upper case';
        break;
      case true:
        flag1 = true;
    }
    switch (regexPatternPlaceName.test(<string>this.location)) {
      case false:
        this.alertLocation =
          'Location must only contain letters and begin with upper case';
        break;
      case true:
        flag2 = true;
    }
    switch (regexPatternPlaceName.test(<string>this.street)) {
      case false:
        this.alertStreet =
          'Street must only contain letters and begin with upper case';
        break;
      case true:
        flag3 = true;
    }
    switch (regexPatternPlaceName.test(<string>this.firstName)) {
      case false:
        this.alertFirstName =
          'FirstName must only contain letters and begin with upper case';
        break;
      case true:
        flag4 = true;
    }
    switch (regexPatternPlaceName.test(<string>this.lastName)) {
      case false:
        this.alertLastName =
          'LastName must only contain letters and begin with upper case';
        break;
      case true:
        flag5 = true;
    }
    switch (regexPatternAbbreviation.test(<string>this.abbreviation)) {
      case false:
        this.alertAbbreviation =
          'Abbreviation must only contain capital letters and only three characters';
        break;
      case true:
        flag6 = true;
    }
    switch (regexPatternTime.test(<string>this.time)) {
      case false:
        this.alertTime = 'Time must only contain numbers in 24h time format';
        break;
      case true:
        flag7 = true;
    }
    switch (regexPatternDate.test(<string>this.date)) {
      case false:
        this.alertDate = 'Date must only contain numbers YYYY-MM-DD format';
        break;
      case true:
        flag8 = true;
    }
    switch (
      flag1 === true &&
      flag2 === true &&
      flag3 === true &&
      flag4 === true &&
      flag5 === true &&
      flag6 === true &&
      flag7 === true &&
      flag8 === true
    ) {
      case true:
        this.createMiti();
    }
  }
  createMiti() {
    const mitiJson = {
      place: {
        locality: this.locality,
        location: this.location,
        street: this.street,
      },
      employee: {
        firstName: this.firstName,
        lastName: this.lastName,
        abbreviation: this.abbreviation,
      },
      time: this.time,
      date: this.date,
    };

    return this.mitiService.createMiti(mitiJson).subscribe(
      () => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        console.log('POST Miti: ', mitiJson);
      },
      (error) => {
        if (
          error.error.message ===
          'This employee already has a lunch table meeting on this day!'
        ) {
          this.alertMitiAlreadyExists = error.error.message;
          console.log(error.error.message);
        } else {
          console.log(error.error.message);
        }
      }
    );
  }
}
