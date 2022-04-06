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
        hour: 12,
        minute: 30,
      },
      {
        locality: "King Döner",
        location: "Oldenburg",
        firstname: "Jane",
        lastname: "Dörte",
        hour: 14,
        minute: 0,
      }
  ]
  constructor() {
  };

  ngOnInit(): void {

  }
}
