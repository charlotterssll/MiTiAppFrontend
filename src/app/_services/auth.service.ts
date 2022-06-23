import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  registerEmployee(
    username?: string,
    email?: string,
    password?: string
  ): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', {
      username,
      email,
      password,
    });
  }

  signInEmployee(username?: string, password?: string): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signin', {
      username,
      password,
    });
  }

  /*
  loginEmployee(user?: string, password?: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user + ':' + password),
    });
    return this.httpClient.get('http://localhost:8080/miti', {
      headers,
      responseType: 'text' as 'json',
    });
  }
   */
}
