import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private httpClient: HttpClient) { }

  urlfetchdata = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb';
  urlfetchhw = 'http://localhost:8080/hello';

  fetchData() {
    return this.httpClient.get(this.urlfetchdata);
  };

  fetchHelloWorld() {
    return this.httpClient.get<string>(this.urlfetchhw);
  }
}
