import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  abbreviation?: string;
  password?: string;

  constructor(private authService: AuthService, private router: Router) {}

  loginEmployee() {
    return this.authService
      .loginEmployee(this.abbreviation, this.password)
      .subscribe(() => {
        this.router.navigate(['/mitiapp']);
      });
  }
}
