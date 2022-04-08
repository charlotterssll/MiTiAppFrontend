import { Component, OnInit } from '@angular/core';
import { MiTi } from "../domain/MiTi";
import {FetchDataService} from "../fetch-data.service";
import {Data} from "../domain/Data";

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})
export class ViewlunchComponent implements OnInit {

  datas?: string;

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

  fetchTestData() {
    return this.fetchDataService.fetchTestData().subscribe(data => {
      this.datas = JSON.stringify(data);
      console.log(this.datas);
    });
  }

  ngOnInit(): void {
    this.fetchTestData();
  }
}
