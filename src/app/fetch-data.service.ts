import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {stringify} from "@angular/compiler/src/util";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private httpClient: HttpClient) { }

    urlfetchdata = 'https://jsonplaceholder.typicode.com/todos';

  fetchData() {
    return this.httpClient.get<string>(this.urlfetchdata);
  };

  async diveData():Promise<Object> {
    return await fetch(this.urlfetchdata);
  };
}
