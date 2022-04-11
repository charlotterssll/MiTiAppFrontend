import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MiTi } from "./domain/entities/MiTi";
import { Employee } from "./domain/entities/Employee";
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private httpClient: HttpClient) {
  }

  urlfetchhw = 'http://localhost:8080/test';
  urlpost = 'http://localhost:8080/test/addemployee';

  fetchMiTis() {
    return this.httpClient.get<MiTi[]>(this.urlfetchhw);
  }

  fetchEmployees() {
    return this.httpClient.get<Employee[]>(this.urlfetchhw);
  }

  createEmployee(f: NgForm) {
    return this.httpClient.post<Employee[]>(this.urlpost, f.value);
  }
}
