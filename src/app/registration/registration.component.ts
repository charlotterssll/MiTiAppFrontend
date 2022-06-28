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
  alertEmail?: string;
  alertPassword?: string;

  constructor(private authService: AuthService) {}

  youShallNotPassNullValues() {
    if (!this.userName || !this.email || !this.password) {
      this.alertNull = 'Bitte keine Felder leer lassen';
      console.log('Null values in any input fields are disallowed');
    } else {
      this.youShallMeetRegexPattern();
    }
  }

  youShallMeetRegexPattern() {
    const regexPatternUserName = new RegExp('^[A-ZÄÖÜ]{3}$');
    const regexPatternEmail = new RegExp(
      "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)" +
        '*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")' +
        '@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])' +
        '?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.)' +
        '{3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]' +
        ':(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
    );
    const regexPatternPassword = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,200}$'
    );

    let flagUserName: boolean = false;
    let flagEmail: boolean = false;
    let flagPassword: boolean = false;

    if (!regexPatternUserName.test(<string>this.userName)) {
      this.alertUserName = 'Kürzel muss aus genau drei Großbuchstaben bestehen';
      console.log(
        'UserName must only contain capital letters and only three characters'
      );
    } else {
      flagUserName = true;
    }
    if (!regexPatternEmail.test(<string>this.email)) {
      this.alertEmail = 'Email muss ein @-Zeichen und eine Domain besitzen';
      console.log('Email must contain an @ and a domain');
    } else {
      flagEmail = true;
    }
    if (!regexPatternPassword.test(<string>this.password)) {
      this.alertPassword = 'Passwort muss diese Zeichen beinhalten';
      console.log('Password must have this characters');
    } else {
      flagPassword = true;
    }
    if (flagUserName && flagEmail && flagPassword) {
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
