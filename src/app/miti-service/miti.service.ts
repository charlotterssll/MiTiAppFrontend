import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Miti } from '../domain/miti/Miti';

@Injectable({
  providedIn: 'root',
})
export class MitiService {
  constructor(private httpClient: HttpClient) {}

  urlFetchMiti = 'http://localhost:8080/miti';

  readMiti() {
    return this.httpClient.get<Miti[]>(this.urlFetchMiti);
  }

  readMitiByMitiId(mitiId: string) {
    return this.httpClient.get<Miti[]>(this.urlFetchMiti + '/' + mitiId);
  }

  createMiti(mitiJson: Object) {
    return this.httpClient.post(this.urlFetchMiti, mitiJson);
  }

  updateMiti(mitiId: string, mitiJson: Object) {
    return this.httpClient.put(this.urlFetchMiti + '/' + mitiId, mitiJson);
  }

  deleteMiti(mitiId: string) {
    return this.httpClient.delete(this.urlFetchMiti + '/' + mitiId);
  }
}
