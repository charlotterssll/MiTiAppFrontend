import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MiTi } from './domain/entities/MiTi';

@Injectable({
  providedIn: 'root',
})
export class MiTiService {
  constructor(private httpClient: HttpClient) {}

  urlfetch = 'http://localhost:8080/mities';
  urlpost = 'http://localhost:8080/mities';

  fetchMiTis() {
    return this.httpClient.get<MiTi[]>(this.urlfetch);
  }

  createMiTi(f: NgForm) {
    return this.httpClient.post<MiTi[]>(this.urlpost, f.value);
  }
}
