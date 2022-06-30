import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../_services/miti.service';
import { TokenstorageService } from '../_services/tokenstorage.service';
import { Employee } from '../domain/employee/Employee';
import { Place } from '../domain/place/Place';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-readmiti',
  templateUrl: './read-miti.component.html',
  styleUrls: ['./read-miti.component.css'],
})
export class ReadMitiComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  mitis?: Miti[];
  employees?: Employee[];
  firstName?: string;
  lastName?: string;
  abbreviation?: string;

  constructor(
    private token: TokenstorageService,
    private mitiService: MitiService,
    private employeeService: EmployeeService
  ) {}

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      this.mitis = response;
      console.log('GET Miti:', this.mitis);
    });
  }

  readEmployee() {
    return this.employeeService
      .readEmployee()
      .subscribe((response: Employee[]) => {
        this.employees = response;
        console.log('GET Employee:', this.employees);
      });
  }

  selectEmployee(value: string) {
    this.firstName = value;
    this.lastName = value;
    this.abbreviation = value;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();

      this.currentUser = user.username;
    }
    this.readMiti();
    this.readEmployee();
  }
}
