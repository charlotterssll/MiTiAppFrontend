import { Component, OnInit } from '@angular/core';
import { MiTi } from "../domain/MiTi";
import {FetchDataService} from "../fetch-data.service";

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})
export class ViewlunchComponent implements OnInit {

  data!: string;

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

  constructor(private fetchDataService: FetchDataService) {

  };

  getNames() {
    return Object.getOwnPropertyNames(this.mities[0]);
  }

  fetchData() {
    return this.fetchDataService.fetchData().subscribe(data => (this.data = data));
  }

  diveData() {
    return this.fetchDataService.diveData();
  }

  ngOnInit(): void {
    console.log(this.fetchData());
    console.log(this.diveData());
  }
}
