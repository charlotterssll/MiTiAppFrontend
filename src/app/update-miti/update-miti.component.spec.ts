import { UpdateMitiComponent } from './update-miti.component';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { ReadMitiComponent } from '../read-miti/read-miti.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

describe('An employee wants to update a...', () => {
  let rendered: RenderResult<UpdateMitiComponent>;

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
    rest.put('http://localhost:8080/miti/1', (req, res, ctx) => {
      let dummyEditedMiti: Miti = {
        place: {
          locality: {
            value: 'Sultan',
          },
          location: {
            value: 'Oldenburg',
          },
          street: {
            value: 'Ritterstraße',
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
      return res(ctx.status(200), ctx.json(dummyEditedMiti));
    }),
    rest.get('http://localhost:8080/miti', (req, res, ctx) => {
      return res(
        ctx.json([
          {
            place: {
              locality: {
                value: 'Sultan',
              },
              location: {
                value: 'Oldenburg',
              },
              street: {
                value: 'Ritterstraße',
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
    rendered = await render(UpdateMitiComponent, {
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

  test('...should not allow to submit null values in lunch table update form', async () => {
    const alertNull = screen.getByLabelText('alert-message-null-values');
    const alertNullMessage = 'Null values in any input fields are disallowed';

    expect(screen.queryByText('Mittagstisch anlegen')).not.toBeInTheDocument();
    expect(screen.getByText('Mittagstisch bearbeiten')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('button-update'));

    expect(alertNull.textContent).toContain(alertNullMessage);
  });

  /*test('...the restaurant on an existing lunch table meeting', async () => {
    expect(screen.queryByText('Mittagstisch anlegen')).not.toBeInTheDocument();
    expect(screen.getByText('Mittagstisch bearbeiten')).toBeInTheDocument();

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

    fireEvent.type(screen.getByLabelText('input-locality'), 'Sultan');
    fireEvent.type(screen.getByLabelText('input-location'), 'Oldenburg');
    fireEvent.type(screen.getByLabelText('input-street'), 'Ritterstraße');
    fireEvent.type(screen.getByLabelText('input-firstName'), 'Hannelore');
    fireEvent.type(screen.getByLabelText(/input-lastName/i), 'Kranz');
    fireEvent.type(screen.getByLabelText(/input-abbreviation/i), 'HKR');
    fireEvent.type(screen.getByLabelText('input-time'), '12:00');
    fireEvent.type(screen.getByLabelText('input-date'), '2022-04-01');

    expect(screen.getByLabelText('input-locality')).toHaveValue('Sultan');
    expect(screen.getByLabelText('input-location')).toHaveValue('Oldenburg');
    expect(screen.getByLabelText('input-location')).toHaveValue('Ritterstraße');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('Hannelore');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('Kranz');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('HKR');
    expect(screen.getByLabelText('input-time')).toHaveValue('12:00');
    expect(screen.getByLabelText('input-date')).toHaveValue('2022-04-01');

    fireEvent.click(screen.getByLabelText('button-update'));

    await rendered.fixture.detectChanges();
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Mittagstisch anlegen')).toBeInTheDocument();
    expect(screen.queryByText('Mittagstisch bearbeiten')).not.toBeInTheDocument();

    expect(screen.getByText('Sultan')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Ritterstraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();
  });*/
});
