import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../_services/place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css'],
})
export class CreatePlaceComponent {
  locality?: string;
  location?: string;
  street?: string;
  alertLocality?: string;
  alertLocation?: string;
  alertStreet?: string;
  alertPlaceAlreadyExists?: string;
  alertNull?: string;

  constructor(private placeService: PlaceService, private router: Router) {}

  youShallNotPassNullValues() {
    if (!this.locality || !this.location || !this.street) {
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
    let flagLocality: boolean = false;
    let flagLocation: boolean = false;
    let flagStreet: boolean = false;

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
    if (flagLocality && flagLocation && flagStreet) {
      this.createPlace();
    }
  }

  createPlace() {
    const placeJson = {
      locality: this.locality,
      location: this.location,
      street: this.street,
    };
    return this.placeService.createMiti(placeJson).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
        console.log('POST Place: ', placeJson);
      },
      (error) => {
        if (error.error.message === 'This place already exists!') {
          this.alertPlaceAlreadyExists = error.error.message;
          console.log(error.error.message);
        } else {
          console.log(error.error.message);
        }
      }
    );
  }
}
