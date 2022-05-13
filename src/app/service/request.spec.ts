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

  test('perform a get request and should return null', () => {
    mitiService.readMiti().subscribe((response: Miti[]) => {
      [dummyMiti] = response;
    });
    const req = httpTestingController.expectOne('http://localhost:8080/miti');
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toBe(null);
  });

  test('perform a get request by id and should return null', async () => {
    mitiService.readMitiByMitiId(mitiId).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
  });

  test('should return a post request', async () => {
    mitiService.createMiti(dummyMiti).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dummyMiti);
  });

  test('should return a put request', async () => {
    mitiService.updateMiti(mitiId, dummyMiti).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(dummyMiti);
  });

  test('should return a delete request', async () => {
    mitiService.deleteMiti(mitiId).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/miti/1');
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
  });

  test('perform a get request and should return null', () => {
    mitiService.readMiti().subscribe((response: Miti[]) => {
      [dummyMiti] = response;
      console.log('GET Miti:', [dummyMiti]);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/miti');
    expect(req.request.body).toBe(null);
  });

  /*test('should get one miti', async () => {
    await render(ViewComponent, {
      declarations: [AppComponent, ViewComponent, UpdateComponent],
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

    const mitiItems = await screen.getAllByRole('rowgroup');
    expect(mitiItems).toHaveLength(dummyMiti.length);

    const mitiService = createMock(MitiService);
    mitiService.readMiti = jest.fn(() => of(mitis));

    const mitiServer = setupServer(
      rest.get('http://localhost:8080/miti', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      }),
      rest.post('http://localhost:8080/miti', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testMiti));
      })
    );
  });*/
});
