import { Component, OnInit } from '@angular/core';
import { MiTi } from "../domain/MiTi";

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})
export class ViewlunchComponent implements OnInit {

  mities: MiTi[] = [
      {
        locality: "Schlöfe",
        location: "Oldenburg",
        firstname: "John",
        lastname: "Dohe",
        time: "12:12",
      },
      {
        locality: "Döner King",
        location: "Oldenburg",
        firstname: "Jane",
        lastname: "Dörte",
        time: "09:30",
      }
  ]

  constructor() {
  };

  function() {
    const keyPropertyName = [Object.getOwnPropertyNames(this.mities[0])];
    return keyPropertyName;
    }

  ngOnInit(): void {
  }
}
