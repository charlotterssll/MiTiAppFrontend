import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../service/miti.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  mitis?: Miti[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  alertNull?: string;

  constructor(private mitiService: MitiService) {}

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      this.mitis = response;
      console.log('GET Miti:', this.mitis);
    });
  }

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.firstName ||
      !this.lastName ||
      !this.time
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
    };
    console.log('POST Miti: ', mitiJson);
    return this.mitiService.createMiti(mitiJson).subscribe(() => {
      this.readMiti();
    });
  }

  ngOnInit(): void {
    this.readMiti();
  }
}
