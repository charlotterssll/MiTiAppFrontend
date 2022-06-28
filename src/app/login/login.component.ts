import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenstorageService } from '../_services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName?: string;
  password?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  alertNull?: string;
  alertUserName?: string;
  roles: string[] = [];
  users: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenstorageService,
    private router: Router
  ) {}

  youShallNotPassNullValues() {
    if (!this.userName) {
      this.alertNull = 'Bitte keine Felder leer lassen';
      console.log('Null values in any input fields are disallowed');
    } else {
      this.youShallMeetRegexPattern();
    }
  }

  youShallMeetRegexPattern() {
    const regexPatternAbbreviation = new RegExp('^[A-ZÄÖÜ]{3}$');

    let flagAbbreviation: boolean = false;

    if (!regexPatternAbbreviation.test(<string>this.userName)) {
      this.alertUserName = 'Kürzel muss aus genau drei Großbuchstaben bestehen';
      console.log(
        'UserName must only contain capital letters and only three characters'
      );
    } else {
      flagAbbreviation = true;
    }
    if (flagAbbreviation) {
      this.signInEmployee();
    }
  }

  signInEmployee() {
    this.authService.signInEmployee(this.userName, this.password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.users = this.tokenStorage.getUser().users;
        this.router.navigate(['/mitiapp']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  /*loginEmployee() {
    return this.authService
      .loginEmployee(this.userName, this.password)
      .subscribe(() => {
        this.router.navigate(['/mitiapp']);
      });
  }
  */

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.users = this.tokenStorage.getUser().username;
    }
  }
}
