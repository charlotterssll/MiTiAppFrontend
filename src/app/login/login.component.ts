import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenstorageService } from '../tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  abbreviation?: string;
  password?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenstorageService,
    private router: Router
  ) {}

  signInEmployee() {
    this.authService.signInEmployee(this.abbreviation, this.password).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/mitiapp']);
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  loginEmployee() {
    return this.authService
      .loginEmployee(this.abbreviation, this.password)
      .subscribe(() => {
        this.router.navigate(['/mitiapp']);
      });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
    }
  }
}
