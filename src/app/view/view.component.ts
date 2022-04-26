import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MiTi } from '../domain/entities/MiTi';
import { MiTiService } from '../miti.service';

export const mitiJson = {
  "place":
    {
      "locality":
        {
          "locality":"Schloefe"
        },
      "location":
        {
          "location":"Oldenburg"
        }
    },
  "employee":
    {
      "firstName":
        {
          "firstName":"Marian"
        },
      "lastName":
        {
          "lastName":"Heck"
        }
    },
  "time":"12:00"
};

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  mities?: MiTi[];

  locality? : string;
  location? : string;
  firstName? : string;
  lastName? : string;
  time? : string;

  saveInputToVariable()
  {
    const localityHolder = this.locality;
    const locationHolder = this.location;
    const firstNameHolder = this.firstName;
    const lastNameHolder = this.lastName;
    const timeHolder = this.time;

    console.log(
      "Locality: " + localityHolder + " "
      + "Location: " + locationHolder + " "
      + "First Name: " + firstNameHolder + " "
      + "Last Name: " + lastNameHolder + " "
      + "Time: " + timeHolder
    );
  }

  constructor(private miTiService: MiTiService) {}

  fetchMitis() {
    return this.miTiService.fetchMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log(this.mities);
    });
  }

  submitMiTi() {

    console.log('Added MiTi:', mitiJson)
    return this.miTiService.createMiTi().subscribe((mitiJson) => {
      console.log('Added MiTi:', mitiJson);
      this.fetchMitis();
    });
  }

  ngOnInit(): void {
    this.fetchMitis();
  }
}
