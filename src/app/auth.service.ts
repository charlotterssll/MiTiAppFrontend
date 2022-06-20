import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  registerEmployee() {}

  loginEmployee(user?: string, password?: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user + ':' + password),
    });
    return this.httpClient.get('http://localhost:8080/miti', {
      headers,
      responseType: 'text' as 'json',
    });
  }
}
