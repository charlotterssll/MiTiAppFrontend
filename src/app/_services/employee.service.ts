import { Injectable } from '@angular/core';
import { Place } from '../domain/place/Place';
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

  readEmployeeById(employeeId: string) {
    return this.httpClient.get<Employee>(
      this.urlFetchEmployee + '/' + employeeId
    );
  }
}
