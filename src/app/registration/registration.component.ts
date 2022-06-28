import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userName?: string;
  email?: string;
  password?: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  alertNull?: string;
  alertUserName?: string;

  constructor(private authService: AuthService) {}

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
      this.registerEmployee();
    }
  }

  registerEmployee() {
    this.authService
      .registerEmployee(this.userName, this.email, this.password)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
