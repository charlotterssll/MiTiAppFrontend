import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Miti } from '../domain/miti/Miti';

@Injectable({
  providedIn: 'root',
})
export class MitiService {
  constructor(private httpClient: HttpClient) {}

  urlFetchMiti = 'http://localhost:8080/miti';
  abbreviation = 'HKR';
  password = 'pwd';

  readMiti() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.abbreviation + ':' + this.password),
    });
    return this.httpClient.get<Miti[]>(this.urlFetchMiti, { headers });
  }

  readMitiByMitiId(mitiId: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.abbreviation + ':' + this.password),
    });
    return this.httpClient.get<Miti>(this.urlFetchMiti + '/' + mitiId, {
      headers,
    });
  }

  createMiti(mitiJson: Object) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.abbreviation + ':' + this.password),
    });
    return this.httpClient.post(this.urlFetchMiti, mitiJson, { headers });
  }

  updateMiti(mitiId: string, mitiJson: Object) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.abbreviation + ':' + this.password),
    });
    return this.httpClient.put(this.urlFetchMiti + '/' + mitiId, mitiJson, {
      headers,
    });
  }

  deleteMiti(mitiId: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.abbreviation + ':' + this.password),
    });
    return this.httpClient.delete(this.urlFetchMiti + '/' + mitiId, {
      headers,
    });
  }
}
