import { render, RenderResult, screen } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { ReadMitiComponent } from './read-miti.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';
import { UpdateMitiComponent } from '../update-miti/update-miti.component';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';

describe('An employee wants to read...', () => {
  let rendered: RenderResult<AppComponent>;

  const server = setupServer(
    rest.post('http://localhost:8080/miti', (req, res, ctx) => {
      let dummyMiti: Miti = {
        place: {
          locality: {
            value: 'Immergrün',
          },
          location: {
            value: 'Oldenburg',
          },
          street: {
            value: 'Poststraße',
          },
        },
        employee: {
          firstName: {
            value: 'Hannelore',
          },
          lastName: {
            value: 'Kranz',
          },
          abbreviation: {
            value: 'HKR',
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
      return res(ctx.status(200), ctx.json(dummyMiti));
    }),
    rest.post('http://localhost:8080/miti', (req, res, ctx) => {
      let dummyMiti: Miti = {
        place: {
          locality: {
            value: 'Metzger',
          },
          location: {
            value: 'Essen',
          },
          street: {
            value: 'Buchstraße',
          },
        },
        employee: {
          firstName: {
            value: 'Karl',
          },
          lastName: {
            value: 'Heinz',
          },
          abbreviation: {
            value: 'KHE',
          },
        },
        time: {
          value: '14:30',
        },
        date: {
          value: '2022-05-01',
        },
        mitiId: '2',
      };
      return res(ctx.status(200), ctx.json(dummyMiti));
    }),
    rest.get('http://localhost:8080/miti', (req, res, ctx) => {
      return res(
        ctx.json([
          {
            place: {
              locality: {
                value: 'Immergrün',
              },
              location: {
                value: 'Oldenburg',
              },
              street: {
                value: 'Poststraße',
              },
            },
            employee: {
              firstName: {
                value: 'Hannelore',
              },
              lastName: {
                value: 'Kranz',
              },
              abbreviation: {
                value: 'HKR',
              },
            },
            time: {
              value: '12:00',
            },
            date: {
              value: '2022-04-01',
            },
            mitiId: '1',
          },
          {
            place: {
              locality: {
                value: 'Metzger',
              },
              location: {
                value: 'Essen',
              },
              street: {
                value: 'Buchstraße',
              },
            },
            employee: {
              firstName: {
                value: 'Karl',
              },
              lastName: {
                value: 'Heinz',
              },
              abbreviation: {
                value: 'KHE',
              },
            },
            time: {
              value: '14:30',
            },
            date: {
              value: '2022-05-01',
            },
            mitiId: '2',
          },
        ])
      );
    })
  );

  const testUtilityFunction = new Promise<void>(async (resolve) => {
    const listener = async (request: MockedRequest) => {
      if (request.url.href === 'http://localhost:8080/miti') {
        setTimeout(resolve, 0);
        server.events.removeListener('request:end', listener);
      }
    };
    server.events.on('request:end', listener);
  });

  beforeAll(() => server.listen());
  beforeEach(async () => {
    rendered = await render(AppComponent, {
      declarations: [
        CreateMitiComponent,
        ReadMitiComponent,
        UpdateMitiComponent,
        DeleteMitiComponent,
      ],
      imports: [FormsModule, HttpClientModule, RouterModule, AppRoutingModule],
      routes: [
        { path: '', component: ReadMitiComponent, pathMatch: 'full' },
        { path: 'update/:id', component: UpdateMitiComponent },
      ],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('...multiple lunch table meetings', async () => {
    expect(screen.getByText('Lunch-Verabredung anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung bearbeiten')
    ).not.toBeInTheDocument();

    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Poststraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    expect(screen.getByText('Metzger')).toBeInTheDocument();
    expect(screen.getByText('Essen')).toBeInTheDocument();
    expect(screen.getByText('Buchstraße')).toBeInTheDocument();
    expect(screen.getByText('Karl')).toBeInTheDocument();
    expect(screen.getByText('Heinz')).toBeInTheDocument();
    expect(screen.getByText('KHE')).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
    expect(screen.getByText('2022-05-01')).toBeInTheDocument();
  });
});
