import { UpdateMitiComponent } from './update-miti.component';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';
import { AppComponent } from '../app.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { ReadMitiComponent } from '../read-miti/read-miti.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

// TODO fix expect updated lunch table meeting values
/*describe('An employee wants to update...', () => {
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
        },
        employee: {
          firstName: {
            value: 'Hannelore',
          },
          lastName: {
            value: 'Kranz',
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
            },
            employee: {
              firstName: {
                value: 'Hannelore',
              },
              lastName: {
                value: 'Kranz',
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
            value: 'Metzger',
          },
          location: {
            value: 'Hannover',
          },
        },
        employee: {
          firstName: {
            value: 'Karl',
          },
          lastName: {
            value: 'Heinz',
          },
        },
        time: {
          value: '14:30',
        },
        date: {
          value: '2022-05-01',
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
                value: 'Metzger',
              },
              location: {
                value: 'Hannover',
              },
            },
            employee: {
              firstName: {
                value: 'Karl',
              },
              lastName: {
                value: 'Heinz',
              },
            },
            time: {
              value: '14:30',
            },
            date: {
              value: '2022-05-01',
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
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
    ).not.toBeInTheDocument();

    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    expect(screen.getByText('12:00')).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('button-edit'));

    expect(
      await screen.queryByText('Mittagstisch bearbeiten')
    ).toBeInTheDocument();

    await rendered.fixture.detectChanges();
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    await userEvent.type(screen.getByLabelText(/input-locality/i), 'Metzger');
    expect(screen.getByLabelText(/input-locality/i)).toHaveValue('Metzger');
    await userEvent.type(screen.getByLabelText(/input-location/i), 'Hannover');
    expect(screen.getByLabelText(/input-location/i)).toHaveValue('Hannover');
    await userEvent.type(screen.getByLabelText(/input-firstName/i), 'Karl');
    expect(screen.getByLabelText(/input-firstName/i)).toHaveValue('Karl');
    await userEvent.type(screen.getByLabelText(/input-lastName/i), 'Heinz');
    expect(screen.getByLabelText(/input-lastName/i)).toHaveValue('Heinz');
    await userEvent.type(screen.getByLabelText(/input-time/i), '14:30');
    expect(screen.getByLabelText(/input-time/i)).toHaveValue('14:30');
    await userEvent.type(screen.getByLabelText(/input-date/i), '2022-05-01');
    expect(screen.getByLabelText(/input-date/i)).toHaveValue('2022-05-01');

    await userEvent.click(screen.getByLabelText('button-update'));

    await rendered.fixture.detectChanges();
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Mittagstisch bearbeiten/i)
    );
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
    ).not.toBeInTheDocument();

    expect(screen.getByText('Metzger')).toBeInTheDocument();
    expect(screen.getByText('Hannover')).toBeInTheDocument();
    expect(screen.getByText('Karl')).toBeInTheDocument();
    expect(screen.getByText('Heinz')).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
    expect(screen.getByText('2022-05-01')).toBeInTheDocument();
  });
});*/

describe('An employee wants to update a...', () => {
  let rendered: RenderResult<UpdateMitiComponent>;

  beforeEach(async () => {
    rendered = await render(UpdateMitiComponent, {
      declarations: [DeleteMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
  });

  test('...locality into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-locality/i), 'Immergrün');
    expect(screen.getByLabelText(/input-locality/i)).toHaveValue('Immergrün');
  });

  test('...should not allow to submit null values in miti form', async () => {
    const buttonUpdate = screen.getByLabelText('button-update');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonUpdate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });
});
