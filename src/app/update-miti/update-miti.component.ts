import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { ActivatedRoute, Router } from '@angular/router';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-updatemiti',
  templateUrl: './update-miti.component.html',
  styleUrls: ['./update-miti.component.css'],
})
export class UpdateMitiComponent implements OnInit {
  mitis: Miti = {
    place: {
      locality: {
        value: '',
      },
      location: {
        value: '',
      },
      street: {
        value: '',
      },
    },
    employee: {
      firstName: {
        value: '',
      },
      lastName: {
        value: '',
      },
      abbreviation: {
        value: '',
      },
    },
    time: {
      value: '',
    },
    date: {
      value: '',
    },
    mitiId: '',
  };
  locality?: string;
  location?: string;
  street?: string;
  firstName?: string;
  lastName?: string;
  abbreviation?: string;
  time?: string;
  date?: string;
  mitiId: string = '';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService
  ) {}

  readMitiByMitiId(mitiId: string) {
    return this.mitiService
      .readMitiByMitiId(mitiId)
      .subscribe((response: Miti) => {
        this.mitis = {
          place: {
            locality: response.place.locality,
            location: response.place.location,
            street: response.place.street,
          },
          employee: {
            firstName: response.employee.firstName,
            lastName: response.employee.lastName,
            abbreviation: response.employee.abbreviation,
          },
          time: response.time,
          date: response.date,
          mitiId: response.mitiId,
        };
        console.log('GET Miti By MitiId:', this.mitiId);
      });
  }

  youShallNotPassNullValues() {
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
      this.alertNull = 'Null values in any input fields are disallowed';
      console.log('Null values in any input fields are disallowed');
    } else {
      this.youShallMeetRegexPattern();
    }
  }

  youShallMeetRegexPattern() {
    const regexPatternPlaceName = new RegExp(
      '[A-ZÄÖÜ][a-zäöüß-]+(\\s[A-ZÄÖÜ][a-zäöüß-]+)*'
    );
    const regexPatternAbbreviation = new RegExp('^[A-ZÄÖÜ]{3}$');
    const regexPatternTime = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    const regexPatternDate = new RegExp(
      '^\\s*((?:19|20)\\d{2})\\-(1[012]|0?[1-9])\\-(3[01]|[12][0-9]|0?[1-9])\\s*$'
    );
    let flagLocality!: boolean;
    let flagLocation!: boolean;
    let flagStreet!: boolean;
    let flagFirstName!: boolean;
    let flagLastName!: boolean;
    let flagAbbreviation!: boolean;
    let flagTime!: boolean;
    let flagDate!: boolean;

    if (!regexPatternPlaceName.test(<string>this.locality)) {
      this.alertLocality =
        'Locality must only contain letters and begin with upper case';
    } else {
      flagLocality = true;
    }
    if (!regexPatternPlaceName.test(<string>this.location)) {
      this.alertLocation =
        'Location must only contain letters and begin with upper case';
    } else {
      flagLocation = true;
    }
    if (!regexPatternPlaceName.test(<string>this.street)) {
      this.alertStreet =
        'Street must only contain letters and begin with upper case';
    } else {
      flagStreet = true;
    }
    if (!regexPatternPlaceName.test(<string>this.firstName)) {
      this.alertFirstName =
        'FirstName must only contain letters and begin with upper case';
    } else {
      flagFirstName = true;
    }
    if (!regexPatternPlaceName.test(<string>this.lastName)) {
      this.alertLastName =
        'LastName must only contain letters and begin with upper case';
    } else {
      flagLastName = true;
    }
    if (!regexPatternAbbreviation.test(<string>this.abbreviation)) {
      this.alertAbbreviation =
        'Abbreviation must only contain capital letters and only three characters';
    } else {
      flagAbbreviation = true;
    }
    if (!regexPatternTime.test(<string>this.time)) {
      this.alertTime = 'Time must only contain numbers in 24h time format';
    } else {
      flagTime = true;
    }
    if (!regexPatternDate.test(<string>this.date)) {
      this.alertDate = 'Date must only contain numbers YYYY-MM-DD format';
    } else {
      flagDate = true;
    }
    if (
      flagLocality &&
      flagLocation &&
      flagStreet &&
      flagFirstName &&
      flagLastName &&
      flagAbbreviation &&
      flagTime &&
      flagDate
    ) {
      this.updateMiti();
    }
  }

  updateMiti() {
    const mitiJson = {
      place: {
        locality: this.mitis.place.locality.value,
        location: this.mitis.place.location.value,
        street: this.mitis.place.street.value,
      },
      employee: {
        firstName: this.mitis.employee.firstName.value,
        lastName: this.mitis.employee.lastName.value,
        abbreviation: this.mitis.employee.abbreviation.value,
      },
      time: this.mitis.time.value,
      date: this.mitis.date.value,
    };
    return this.mitiService.updateMiti(this.mitiId, mitiJson).subscribe(
      () => {
        console.log('UPDATE Miti: ', this.mitiId);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['']);
      },
      (error) => {
        if (
          error.error.message ===
          'This employee already has a lunch table meeting on this day!'
        ) {
          console.log(error.error.message);
          this.alertMitiAlreadyExists = error.error.message;
        } else {
          console.log(error.error.message);
        }
      }
    );
  }

  returnToView() {
    this.router.navigateByUrl('update/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
    this.readMitiByMitiId(this.mitiId);
  }
}
