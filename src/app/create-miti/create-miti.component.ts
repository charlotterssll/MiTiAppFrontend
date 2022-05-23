import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-createmiti',
  templateUrl: './create-miti.component.html',
  styleUrls: ['./create-miti.component.css'],
})
export class CreateMitiComponent {
  mitis?: Miti[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  date?: string;
  alertNull?: string;

  constructor(private mitiService: MitiService) {}

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.firstName ||
      !this.lastName ||
      !this.time ||
      !this.date
    ) {
      this.alertNull = 'Null values in any form fields are disallowed';
      console.log('Null values in any form fields are disallowed');
    } else {
      this.createMiti();
    }
  }

  createMiti() {
    const mitiJson = {
      place: {
        locality: this.locality,
        location: this.location,
      },
      employee: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
      time: this.time,
      date: this.date,
    };
    console.log('POST Miti: ', mitiJson);
    return this.mitiService.createMiti(mitiJson).subscribe(() => {
      this.readMiti();
    });
  }

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      this.mitis = response;
      console.log('GET Miti:', this.mitis);
    });
  }
}
