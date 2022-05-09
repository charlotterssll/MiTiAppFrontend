import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Miti } from './domain/miti/Miti';

@Injectable({
  providedIn: 'root',
})
export class MitiService {
  constructor(private httpClient: HttpClient) {}

  urlfetch = 'http://localhost:8080/miti';
  urlpost = 'http://localhost:8080/miti';
  urlbyid = 'http://localhost:8080/miti/';

  getMiti() {
    return this.httpClient.get<Miti[]>(this.urlfetch);
  }

  getMitiByMitiId(mitiId: number) {
    return this.httpClient.get<Miti[]>(this.urlbyid + mitiId);
  }

  createMiti(mitiJson: Object) {
    return this.httpClient.post(this.urlpost, mitiJson);
  }

  deleteMiti(mitiId: number) {
    return this.httpClient.delete(this.urlbyid + mitiId);
  }
}
