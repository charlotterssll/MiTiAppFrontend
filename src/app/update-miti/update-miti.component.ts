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
      !this.mitis.place.locality.value ||
      !this.mitis.place.location.value ||
      !this.mitis.place.street.value ||
      !this.mitis.employee.firstName.value ||
      !this.mitis.employee.lastName.value ||
      !this.mitis.employee.abbreviation.value ||
      !this.mitis.time.value ||
      !this.mitis.date.value
    ) {
      this.alertNull = 'Bitte keine Felder leer lassen';
      console.log('Null values in any input fields are disallowed');
    } else {
      this.youShallMeetRegexPattern();
    }
  }

  youShallMeetRegexPattern() {
    const regexPatternLocality = new RegExp('^[^\\s](?!\\s*$).+');
    const regexPatternLocationFirstAndLastName = new RegExp(
      '[A-ZÄÖÜÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ][a-zäöüßáàâéèêíìîóòôúùûß-]+(\\s[A-ZÄÖÜÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ][a-zäöüßáàâéèêíìîóòôúùûß-]+)*'
    );
    const regexPatternStreetAndNumber = new RegExp(
      '^([A-ZÄÖÜÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ][a-zäöüßáàâéèêíìîóòôúùû\\s-]*)+?(\\s[1-9]\\d*(?:[ -]?(?:[a-zäöüßáàâéèêíìîóòôúùûA-ZÄÖÜÁÀÂÉÈÊÍÌÎÓÒÔÚÙÛ]+|[1-9]\\d*))?)?$'
    );
    const regexPatternAbbreviation = new RegExp('^[A-ZÄÖÜ]{3}$');
    const regexPatternTime = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    const regexPatternDate = new RegExp(
      '^\\s*((?:19|20)\\d{2})\\-(1[012]|0?[1-9])\\-(3[01]|[12][0-9]|0?[1-9])\\s*$'
    );
    let flagLocality: boolean = false;
    let flagLocation: boolean = false;
    let flagStreet: boolean = false;
    let flagFirstName: boolean = false;
    let flagLastName: boolean = false;
    let flagAbbreviation: boolean = false;
    let flagTime: boolean = false;
    let flagDate: boolean = false;

    if (!regexPatternLocality.test(<string>this.mitis.place.locality.value)) {
      this.alertLocality =
        'Lokal darf verschiedene Zeichen haben, sowie Groß- und Kleinschreibung beinhalten';
      console.log(
        'Locality can contain different characters, upper cases and lower cases'
      );
    } else {
      flagLocality = true;
    }
    if (
      !regexPatternLocationFirstAndLastName.test(
        <string>this.mitis.place.location.value
      )
    ) {
      this.alertLocation =
        'Ort darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
      console.log(
        'Location must only contain letters and/or dashes and begin with upper case'
      );
    } else {
      flagLocation = true;
    }
    if (
      !regexPatternStreetAndNumber.test(<string>this.mitis.place.street.value)
    ) {
      this.alertStreet =
        'Straßename darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen, mit einem Leerzeichen' +
        ' getrennt darf eine Hausnummer angegeben werden';
      console.log(
        'Street must only contain letters and/or dashes and begin with upper case, it may also contain a house number'
      );
    } else {
      flagStreet = true;
    }
    if (
      !regexPatternLocationFirstAndLastName.test(
        <string>this.mitis.employee.firstName.value
      )
    ) {
      this.alertFirstName =
        'Vorname darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
      console.log(
        'FirstName must only contain letters and/or dashes and begin with upper case'
      );
    } else {
      flagFirstName = true;
    }
    if (
      !regexPatternLocationFirstAndLastName.test(
        <string>this.mitis.employee.lastName.value
      )
    ) {
      this.alertLastName =
        'Nachname darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
      console.log(
        'LastName must only contain letters and/or dashes and begin with upper case'
      );
    } else {
      flagLastName = true;
    }
    if (
      !regexPatternAbbreviation.test(
        <string>this.mitis.employee.abbreviation.value
      )
    ) {
      this.alertAbbreviation =
        'Kürzel muss aus genau drei Großbuchstaben bestehen';
      console.log(
        'Abbreviation must only contain capital letters and only three characters'
      );
    } else {
      flagAbbreviation = true;
    }
    if (!regexPatternTime.test(<string>this.mitis.time.value)) {
      this.alertTime =
        'Uhrzeit darf nur Zahlen im 24 Stunden Format enthalten. Bei einer einstelligen Zahl bitte eine führende Null angeben, Minuten 00-59, Stunden 00-23';
      console.log(
        'Time must only contain numbers in 24h time format, if its a single digit number please add a leading zero, minutes 00-59, hours 00-23'
      );
    } else {
      flagTime = true;
    }
    if (!regexPatternDate.test(<string>this.mitis.date.value)) {
      this.alertDate = 'Datum darf nur Zahlen im JJJJ-MM-TT Format enthalten';
      console.log('Date must only contain numbers YYYY-MM-DD format');
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
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/mitiapp']);
        console.log('UPDATE Miti: ', this.mitiId);
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
      this.router.navigate(['/mitiapp']);
    });
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
    this.readMitiByMitiId(this.mitiId);
  }
}
