import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../domain/place/Place';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private httpClient: HttpClient) {}

  urlFetchPlace = 'http://localhost:8080/place';

  readPlace() {
    return this.httpClient.get<Place[]>(this.urlFetchPlace);
  }

  createPlace(placeJson: Object) {
    return this.httpClient.post(this.urlFetchPlace, placeJson);
  }
}
