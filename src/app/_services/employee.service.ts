import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../domain/employee/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  urlFetchEmployee = 'http://localhost:8080/employee';

  constructor(private httpClient: HttpClient) {}

  readEmployee() {
    return this.httpClient.get<Employee[]>(this.urlFetchEmployee);
  }
}
