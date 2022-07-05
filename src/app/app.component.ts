import { Component } from '@angular/core';
import { TokenstorageService } from './_services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MitiAppFrontend';
  employeeRole?: string;
  isLoggedIn = false;
  currentRoute?: string;
  username?: string;

  constructor(private tokenStorageService: TokenstorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN') {
        this.employeeRole = 'Admin';
      } else {
        this.employeeRole = 'User';
      }

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
