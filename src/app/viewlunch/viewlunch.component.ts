import { Component, OnInit } from '@angular/core';
import {MiTi} from "../domain/MiTi";

const mitiObject = {
  locality: 'Schlöfe',
  location: 'Oldenburg',
  firstname: 'test1',
  lastname: 'test2',
  hour: 1,
  minute: 2,
}

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})

export class ViewlunchComponent implements OnInit {

  mities: MiTi[] = [];

  constructor() {
    this.mities = [
      {locality: 'Schlöfe',
        location: 'Oldenburg',
        firstname: 'test1',
        lastname: 'test2',
        hour: 1,
        minute: 2,}
    ]
  }

  ngOnInit(): void {
  }

}
