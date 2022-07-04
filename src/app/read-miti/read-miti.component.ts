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

      this.currentUser = user.username;
    }
    this.readMiti();
  }
}
