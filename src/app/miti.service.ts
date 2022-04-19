import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MiTiNotNested } from './domain/entities/MiTiNotNested';
import { MiTi } from "./domain/entities/MiTi";

@Injectable({
  providedIn: 'root',
})
export class MiTiService {
  constructor(private httpClient: HttpClient) {}

  urlfetch = 'http://localhost:8080/mities';
  urlpost = 'http://localhost:8080/mities/addmiti';

  /*fetchMiTis() {
    return this.httpClient.get<MiTi[]>(this.urlfetch);
  }

  createMiTi(f: NgForm) {
    return this.httpClient.post<MiTi[]>(this.urlpost, f.value);
  }*/

  fetchMiTisNotNested() {
    return this.httpClient.get<MiTiNotNested[]>(this.urlfetch);
  }

  createMiTiNotNested(f: NgForm) {
    return this.httpClient.post<MiTiNotNested[]>(this.urlpost, f.value);
  }
}
