import { Miti } from '../domain/miti/Miti';
import { MitiService } from './miti.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

describe('Miti Request Test', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mitiService: MitiService;
  let mitiId = '1';
  let dummyMiti: Miti = {
    place: {
      locality: {
        value: 'Schloefe',
      },
      location: {
        value: 'Oldenburg',
      },
    },
    employee: {
      firstName: {
        value: 'Charlotte',
      },
      lastName: {
        value: 'Russell',
      },
    },
    time: {
      value: '12:00',
    },
    date: {
      value: '2022-04-01',
    },
    mitiId: '1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MitiService],
    });
    httpClient = TestBed.inject(HttpClient);
    mitiService = TestBed.inject(MitiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('perform a get request and should return null', async () => {
    await mitiService.readMiti().subscribe((response: Miti[]) => {
      [dummyMiti] = response;
    });
    const req = httpTestingController.expectOne('http://localhost:8080/miti');
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toBe(null);
  });

  test('perform a get request by id and should return null', async () => {
    await mitiService.readMitiByMitiId(mitiId).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
  });

  test('should return a post request', async () => {
    await mitiService.createMiti(dummyMiti).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dummyMiti);
  });

  test('should return a put request', async () => {
    await mitiService.updateMiti(mitiId, dummyMiti).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(dummyMiti);
  });

  test('should return a delete request', async () => {
    await mitiService.deleteMiti(mitiId).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
  });

  /*test('should get one miti', async () => {
    await render(ReadAndCreateMitiComponent, {
      declarations: [AppComponent, ReadAndCreateMitiComponent, UpdateAndDeleteMitiComponent],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule,
        AppRoutingModule,
      ],
      componentProviders: [
        {
          provide: MitiService,
        },
      ],
    });

    const mitiService = createMock(MitiService);
    mitiService.readMiti = jest.fn(() => of([dummyMiti]));
  });*/
});
