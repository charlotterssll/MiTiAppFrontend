import { Component, OnInit } from '@angular/core';
import { MiTi } from "../domain/MiTi";
import {FetchDataService} from "../fetch-data.service";

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})
export class ViewlunchComponent implements OnInit {

  datas!: Object;
  users: Object | any;
  helloworld!: string;

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
    this.fetchDataService.fetchData().subscribe((data: any) => {
      this.users = data['results'][0];
      console.log(this.users);
    });
  }

  fetchHelloWorld() {
    return this.fetchDataService.fetchHelloWorld().subscribe(data => {
      this.helloworld = data;
      console.log(this.datas);
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
