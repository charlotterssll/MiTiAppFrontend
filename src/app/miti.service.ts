import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MiTi } from './domain/entities/MiTi';
import {mitiJson} from "./view/view.component";

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

  createMiTi() {
    return this.httpClient.post(this.urlpost, mitiJson);
  }
}
