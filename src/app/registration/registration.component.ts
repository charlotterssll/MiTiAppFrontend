import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  firstName?: string;
  lastName?: string;
  abbreviation?: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  registerEmployee() {
    return this.authService
      .registerEmployee(this.firstName, this.lastName, this.abbreviation)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        (error: any) => {
          this.errorMessage = error.message;
          this.isSignUpFailed = true;
        }
      );
  }
}
