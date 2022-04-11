import { Component, OnInit } from '@angular/core';
import { MiTi } from "../domain/entities/MiTi";
import { FetchDataService } from "../fetch-data.service";
import { Employee } from "../domain/entities/Employee";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-viewlunch',
  templateUrl: './viewlunch.component.html',
  styleUrls: ['./viewlunch.component.css']
})
export class ViewlunchComponent implements OnInit {

  mities?: MiTi[];
  employees?: Employee[];

  constructor(private fetchDataService: FetchDataService) {};

  fetchMitis() {
    return this.fetchDataService.fetchMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log(this.mities[0]);
    })
  }

  fetchEmployees() {
    return this.fetchDataService.fetchEmployees().subscribe((response: Employee[]) => {
      this.employees = response;
      console.log(this.employees);
    })
  }

  submitEmployee(f: NgForm) {
    return this.fetchDataService.createEmployee(f).subscribe((response: Employee[]) => {
      console.log('Added Employee:', response);
      this.fetchEmployees();
    })
  }

  ngOnInit(): void {
    //this.fetchMitis();
    this.fetchEmployees();
  }
}
