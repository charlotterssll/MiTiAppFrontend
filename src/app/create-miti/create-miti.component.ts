import { Component, OnInit } from '@angular/core';
import { MitiService } from '../_services/miti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenstorageService } from '../_services/tokenstorage.service';
import { Place } from '../domain/place/Place';
import { PlaceService } from '../_services/place.service';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../domain/employee/Employee';
import { User } from '../domain/user/User';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-createmiti',
  templateUrl: './create-miti.component.html',
  styleUrls: ['./create-miti.component.css'],
})
export class CreateMitiComponent implements OnInit {
  locality: any;
  location: any;
  street: any;
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
  alertNoMoreEmployees?: string;
  alertEmployeeNotRegistered?: string;
  currentUser: any;
  isLoggedIn = false;
  isDisabled = false;
  places?: Place[];
  employees?: Employee[];
  employeeArray: Array<any> = [];
  newEmployee: any = {};
  users?: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService,
    private placeService: PlaceService,
    private employeeService: EmployeeService,
    private token: TokenstorageService,
    private authService: AuthService
  ) {}

  youShallNotPassNullValues() {
    if (
      !this.locality ||
      !this.location ||
      !this.street ||
      !this.newEmployee.firstName ||
      !this.newEmployee.lastName ||
      !this.newEmployee.abbreviation ||
      !this.time ||
      !this.date
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

    if (!regexPatternLocality.test(<string>this.locality)) {
      this.alertLocality =
        'Lokal darf verschiedene Zeichen haben, sowie Groß- und Kleinschreibung beinhalten';
      console.log(
        'Locality can contain different characters, upper cases and lower cases'
      );
    } else {
      flagLocality = true;
    }
    if (!regexPatternLocationFirstAndLastName.test(<string>this.location)) {
      this.alertLocation =
        'Ort darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
      console.log(
        'Location must only contain letters and/or dashes and begin with upper case'
      );
    } else {
      flagLocation = true;
    }
    if (!regexPatternStreetAndNumber.test(<string>this.street)) {
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
        <string>this.newEmployee.firstName
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
        <string>this.newEmployee.lastName
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
    if (!regexPatternAbbreviation.test(<string>this.newEmployee.abbreviation)) {
      this.alertAbbreviation =
        'Kürzel muss aus genau drei Großbuchstaben bestehen';
      console.log(
        'Abbreviation must only contain capital letters and only three characters'
      );
    } else {
      flagAbbreviation = true;
    }
    if (!regexPatternTime.test(<string>this.time)) {
      this.alertTime =
        'Uhrzeit darf nur Zahlen im 24 Stunden Format enthalten. Bei einer einstelligen Zahl bitte eine führende Null angeben, Minuten 00-59, Stunden 00-23';
      console.log(
        'Time must only contain numbers in 24h time format, if its a single digit number please add a leading zero, minutes 00-59, hours 00-23'
      );
    } else {
      flagTime = true;
    }
    if (!regexPatternDate.test(<string>this.date)) {
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
      this.createMiti();
    }
  }

  createMiti() {
    let mitiJson: Object;
    if (this.employeeArray.length == 0) {
      mitiJson = {
        place: {
          locality: this.locality,
          location: this.location,
          street: this.street,
        },
        employee: [
          {
            firstName: this.newEmployee.firstName,
            lastName: this.newEmployee.lastName,
            abbreviation: this.newEmployee.abbreviation,
          },
        ],
        time: this.time,
        date: this.date,
      };
      return this.mitiService.createMiti(mitiJson).subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          console.log('POST Miti: ', mitiJson);
        },
        (error) => {
          if (
            error.error.message ===
            'This employee already has a lunch table meeting on this day'
          ) {
            this.alertMitiAlreadyExists =
              'Diese Kolleg*in hat heute bereits eine Lunch-Verabredung';
            console.log(error.error.message);
          } else if (
            error.error.message ===
            'Employee could not get added to the lunch table meeting because this employee is not registered'
          ) {
            this.alertEmployeeNotRegistered =
              'Diese Kolleg*in kann nicht zu der Lunch-Verabredung hinzugefügt werden, da diese nicht registriert ist';
          } else {
            console.log(error.error.message);
          }
        }
      );
    } else if (this.employeeArray.length == 1) {
      mitiJson = {
        place: {
          locality: this.locality,
          location: this.location,
          street: this.street,
        },
        employee: [
          {
            firstName: this.employeeArray[0].firstName,
            lastName: this.employeeArray[0].lastName,
            abbreviation: this.employeeArray[0].abbreviation,
          },
          {
            firstName: this.newEmployee.firstName,
            lastName: this.newEmployee.lastName,
            abbreviation: this.newEmployee.abbreviation,
          },
        ],
        time: this.time,
        date: this.date,
      };
      return this.mitiService.createMiti(mitiJson).subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          console.log('POST Miti: ', mitiJson);
        },
        (error) => {
          if (
            error.error.message ===
            'This employee already has a lunch table meeting on this day'
          ) {
            this.alertMitiAlreadyExists =
              'Diese Kolleg*in hat heute bereits eine Lunch-Verabredung';
            console.log(error.error.message);
          } else if (
            error.error.message ===
            'Employee could not get added to the lunch table meeting because this employee is not registered'
          ) {
            this.alertEmployeeNotRegistered =
              'Diese Kolleg*in mit dem Kürzel kann nicht zu der Lunch-Verabredung hinzugefügt werden, da diese nicht registriert ist';
          } else {
            console.log(error.error.message);
          }
        }
      );
    } else if (this.employeeArray.length == 2) {
      mitiJson = {
        place: {
          locality: this.locality,
          location: this.location,
          street: this.street,
        },
        employee: [
          {
            firstName: this.employeeArray[0].firstName,
            lastName: this.employeeArray[0].lastName,
            abbreviation: this.employeeArray[0].abbreviation,
          },
          {
            firstName: this.employeeArray[1].firstName,
            lastName: this.employeeArray[1].lastName,
            abbreviation: this.employeeArray[1].abbreviation,
          },
          {
            firstName: this.newEmployee.firstName,
            lastName: this.newEmployee.lastName,
            abbreviation: this.newEmployee.abbreviation,
          },
        ],
        time: this.time,
        date: this.date,
      };
      return this.mitiService.createMiti(mitiJson).subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          console.log('POST Miti: ', mitiJson);
        },
        (error) => {
          if (
            error.error.message ===
            'This employee already has a lunch table meeting on this day'
          ) {
            this.alertMitiAlreadyExists =
              'Diese Kolleg*in hat heute bereits eine Lunch-Verabredung';
            console.log(error.error.message);
          } else if (
            error.error.message ===
            'Employee could not get added to the lunch table meeting because this employee is not registered'
          ) {
            this.alertEmployeeNotRegistered =
              'Diese Kolleg*in mit dem Kürzel kann nicht zu der Lunch-Verabredung hinzugefügt werden, da diese nicht registriert ist';
          } else {
            console.log(error.error.message);
          }
        }
      );
    } else if (this.employeeArray.length == 3) {
      mitiJson = {
        place: {
          locality: this.locality,
          location: this.location,
          street: this.street,
        },
        employee: [
          {
            firstName: this.employeeArray[0].firstName,
            lastName: this.employeeArray[0].lastName,
            abbreviation: this.employeeArray[0].abbreviation,
          },
          {
            firstName: this.employeeArray[1].firstName,
            lastName: this.employeeArray[1].lastName,
            abbreviation: this.employeeArray[1].abbreviation,
          },
          {
            firstName: this.employeeArray[2].firstName,
            lastName: this.employeeArray[2].lastName,
            abbreviation: this.employeeArray[2].abbreviation,
          },
          {
            firstName: this.newEmployee.firstName,
            lastName: this.newEmployee.lastName,
            abbreviation: this.newEmployee.abbreviation,
          },
        ],
        time: this.time,
        date: this.date,
      };
      return this.mitiService.createMiti(mitiJson).subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          console.log('POST Miti: ', mitiJson);
        },
        (error) => {
          if (
            error.error.message ===
            'This employee already has a lunch table meeting on this day'
          ) {
            this.alertMitiAlreadyExists =
              'Diese Kolleg*in hat heute bereits eine Lunch-Verabredung';
            console.log(error.error.message);
          } else if (
            error.error.message ===
            'Employee could not get added to the lunch table meeting because this employee is not registered'
          ) {
            this.alertEmployeeNotRegistered =
              'Diese Kolleg*in mit dem Kürzel kann nicht zu der Lunch-Verabredung hinzugefügt werden, da diese nicht registriert ist';
          } else {
            console.log(error.error.message);
          }
        }
      );
    } else {
      mitiJson = {
        place: {
          locality: this.locality,
          location: this.location,
          street: this.street,
        },
        employee: [
          {
            firstName: this.employeeArray[0].firstName,
            lastName: this.employeeArray[0].lastName,
            abbreviation: this.employeeArray[0].abbreviation,
          },
          {
            firstName: this.employeeArray[1].firstName,
            lastName: this.employeeArray[1].lastName,
            abbreviation: this.employeeArray[1].abbreviation,
          },
          {
            firstName: this.employeeArray[2].firstName,
            lastName: this.employeeArray[2].lastName,
            abbreviation: this.employeeArray[2].abbreviation,
          },
          {
            firstName: this.employeeArray[3].firstName,
            lastName: this.employeeArray[3].lastName,
            abbreviation: this.employeeArray[3].abbreviation,
          },
          {
            firstName: this.newEmployee.firstName,
            lastName: this.newEmployee.lastName,
            abbreviation: this.newEmployee.abbreviation,
          },
        ],
        time: this.time,
        date: this.date,
      };
      return this.mitiService.createMiti(mitiJson).subscribe(
        () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          console.log('POST Miti: ', mitiJson);
        },
        (error) => {
          if (
            error.error.message ===
            'This employee already has a lunch table meeting on this day'
          ) {
            this.alertMitiAlreadyExists =
              'Diese Kolleg*in hat heute bereits eine Lunch-Verabredung';
            console.log(error.error.message);
          } else if (
            error.error.message ===
            'Employee could not get added to the lunch table meeting because this employee is not registered'
          ) {
            this.alertEmployeeNotRegistered =
              'Diese Kolleg*in mit dem Kürzel kann nicht zu der Lunch-Verabredung hinzugefügt werden, da diese nicht registriert ist';
          } else {
            console.log(error.error.message);
          }
        }
      );
    }
  }

  readUser() {
    return this.authService.readUser().subscribe((response: User[]) => {
      this.users = response;
      console.log('GET User:', this.users);
    });
  }

  readEmployee() {
    return this.employeeService
      .readEmployee()
      .subscribe((response: Employee[]) => {
        this.employees = response;
        console.log('GET Employee:', this.employees);
      });
  }

  selectEmployee(value: string) {
    //let firstNameValue = document.getElementById("div-employee-firstName").innerHTML;
    //firstNameValue = value;
    this.newEmployee.firstName = value;
    this.newEmployee.lastName = value;
    this.newEmployee.abbreviation = value;
  }

  selectFirstName(value: string) {
    this.newEmployee.firstName = value;
  }

  selectLastName(value: string) {
    this.newEmployee.lastName = value;
  }

  selectAbbreviation(value: string) {
    this.newEmployee.abbreviation = value;
  }

  addEmployee() {
    if (this.employeeArray.length == 3) {
      this.isDisabled = true;
      this.alertNoMoreEmployees =
        'Du kannst nicht mehr als fünf Kolleg*innen zu deiner Lunch-Verabredung einladen!';
    }
    this.employeeArray.push(this.newEmployee);
    this.newEmployee = {};
  }

  removeEmployee(index: number) {
    this.employeeArray.splice(index, 1);
  }

  readPlace() {
    return this.placeService.readPlace().subscribe((response: Place[]) => {
      this.places = response;
      console.log('GET Place:', this.places);
    });
  }

  selectPlace(value: string) {
    this.locality = value;
    this.location = value;
    this.street = value;
  }

  /*selectPlace(value: Place) {
    this.locality = value.locality.value;
    this.location = value.location.value;
    this.street = value.street.value;
  }

  selectPlaceAll(
    placeValue1: string,
    placeValue2: string,
    placeValue3: string
  ) {
    this.placeObject = {
      locality: {
        value: placeValue1,
      },
      location: {
        value: placeValue2,
      },
      street: {
        value: placeValue3,
      },
    };
    console.log(this.placeObject);
  }*/

  selectLocality(value: string) {
    this.locality = value;
  }

  selectLocation(value: string) {
    this.location = value;
  }

  selectStreet(value: string) {
    this.street = value;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();

      this.currentUser = user.username;
      this.newEmployee.abbreviation = user.username;
    }
    this.readPlace();
    this.readEmployee();
    this.readUser();
  }
}
