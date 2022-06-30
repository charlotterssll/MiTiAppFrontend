import { Component } from '@angular/core';
import { TokenstorageService } from './_services/tokenstorage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MitiAppFrontend';
  private roles: string[] = [];
  isLoggedIn = false;
  isOnRegistration = false;
  currentRoute?: string;
  username?: string;

  constructor(
    private tokenStorageService: TokenstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
