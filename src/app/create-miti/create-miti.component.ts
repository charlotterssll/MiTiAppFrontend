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
    const regexPatternPlaceName = new RegExp(
      '[A-ZÄÖU][a-zäöüß-]+(\\s[A-ZÄÖÜ][a-zäöüß-]+)*'
    );
    const regexPatternAbbreviation = new RegExp('[A-ZÄÖU]+(s[A-ZÄÖÜ]+)*');
    const regexPatternTime = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    const regexPatternDate = new RegExp(
      '^\\s*((?:19|20)\\d{2})-(1[012]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])\\s*$'
    );
    if (!regexPatternPlaceName.test(<string>this.locality)) {
      this.alertLocality =
        'Locality must only contain letters and begin with upper case';
      console.log(
        'Locality must only contain letters and begin with upper case'
      );
    }
    if (!regexPatternPlaceName.test(<string>this.location)) {
      this.alertLocation =
        'Location must only contain letters and begin with upper case';
      console.log(
        'Location must only contain letters and begin with upper case'
      );
    }
    if (!regexPatternPlaceName.test(<string>this.street)) {
      this.alertStreet =
        'Street must only contain letters and begin with upper case';
      console.log('Street must only contain letters and begin with upper case');
    }
    if (!regexPatternPlaceName.test(<string>this.firstName)) {
      this.alertFirstName =
        'FirstName must only contain letters and begin with upper case';
      console.log(
        'FirstName must only contain letters and begin with upper case'
      );
    }
    if (!regexPatternPlaceName.test(<string>this.lastName)) {
      this.alertLastName =
        'LastName must only contain letters and begin with upper case';
      console.log(
        'LastName must only contain letters and begin with upper case'
      );
    }
    if (!regexPatternAbbreviation.test(<string>this.abbreviation)) {
      this.alertAbbreviation =
        'Abbreviation must only contain capital letters and only three characters';
      console.log(
        'Abbreviation must only contain capital letters and only three characters'
      );
    }
    if (!regexPatternTime.test(<string>this.time)) {
      this.alertTime = 'Time must only contain numbers in 24h time format';
      console.log('Time must only contain numbers in 24h time format');
    }
    if (!regexPatternDate.test(<string>this.date)) {
      this.alertDate = 'Date must only contain numbers YYYY-MM-DD format';
      console.log('Date must only contain numbers YYYY-MM-DD format');
    } else {
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
          'Employee already has a lunch table meeting on this day!'
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
