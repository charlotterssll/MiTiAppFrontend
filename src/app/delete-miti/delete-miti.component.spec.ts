import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMitiComponent } from './delete-miti.component';
import { UpdateMitiComponent } from '../update-miti/update-miti.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';
import { ReadMitiComponent } from '../read-miti/read-miti.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { AppComponent } from '../app.component';

describe('An employee wants to delete...', () => {
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
        ])
      );
    }),
    rest.get('http://localhost:8080/miti/1', (req, res, ctx) => {
      return res(
        ctx.json({
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
        })
      );
    }),
    rest.delete('http://localhost:8080/miti/1', (req, res, ctx) => {
      return res(ctx.status(200));
    }),
    rest.get('http://localhost:8080/miti', (req, res, ctx) => {
      return res(ctx.json([]));
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

  const testUtilityFunctionWithId = new Promise<void>(async (resolve) => {
    const listener = async (request: MockedRequest) => {
      if (request.url.href === 'http://localhost:8080/miti/1') {
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
        { path: 'update/:id', component: UpdateMitiComponent },
        { path: '', component: ReadMitiComponent, pathMatch: 'full' },
      ],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('...an existing lunch table meeting', async () => {
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

    fireEvent.click(screen.getByLabelText('button-edit'));

    await rendered.fixture.detectChanges();
    await rendered.fixture.detectChanges();
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    expect(
      screen.queryByText('Lunch-Verabredung anlegen')
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Lunch-Verabredung bearbeiten')
    ).toBeInTheDocument();

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Poststraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('button-delete'));

    await rendered.fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Lunch-Verabredung anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung bearbeiten')
    ).not.toBeInTheDocument();

    expect(screen.queryByText('Immergrün')).not.toBeInTheDocument();
    expect(screen.queryByText('Oldenburg')).not.toBeInTheDocument();
    expect(screen.queryByText('Poststraße')).not.toBeInTheDocument();
    expect(screen.queryByText('Hannelore')).not.toBeInTheDocument();
    expect(screen.queryByText('Kranz')).not.toBeInTheDocument();
    expect(screen.queryByText('HKR')).not.toBeInTheDocument();
    expect(screen.queryByText('12:00')).not.toBeInTheDocument();
    expect(screen.queryByText('2022-04-01')).not.toBeInTheDocument();
  });
});
