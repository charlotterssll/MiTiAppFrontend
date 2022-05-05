import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiTi } from './domain/miti/MiTi';

@Injectable({
  providedIn: 'root',
})
export class MiTiService {
  constructor(private httpClient: HttpClient) {}

  urlfetch = 'http://localhost:8080/mities';
  urlpost = 'http://localhost:8080/mities';
  urlbyid = 'http://localhost:8080/mities/';

  getMiTis() {
    return this.httpClient.get<MiTi[]>(this.urlfetch);
  }

  getMiTiByMiTiId(miTiId: number) {
    return this.httpClient.get<MiTi[]>(this.urlbyid + miTiId);
  }

  createMiTi(miTiJson: Object) {
    return this.httpClient.post(this.urlpost, miTiJson);
  }

  deleteMiTi(miTiId: number) {
    return this.httpClient.delete(this.urlbyid + miTiId);
  }
}
