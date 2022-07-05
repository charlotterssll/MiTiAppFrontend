import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../_services/miti.service';
import { TokenstorageService } from '../_services/tokenstorage.service';

@Component({
  selector: 'app-readmiti',
  templateUrl: './read-miti.component.html',
  styleUrls: ['./read-miti.component.css'],
})
export class ReadMitiComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  mitis?: Miti[];
  firstName?: string;
  lastName?: string;
  abbreviation?: string;
  employeeRole?: string;

  constructor(
    private token: TokenstorageService,
    private mitiService: MitiService
  ) {}

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      this.mitis = response;
      console.log('GET Miti:', this.mitis);
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      if (this.token.getUser().roles == 'ROLE_ADMIN') {
        this.employeeRole = 'Admin';
      } else {
        this.employeeRole = 'User';
      }
      this.currentUser = user.username;
    }
    this.readMiti();
  }
}
