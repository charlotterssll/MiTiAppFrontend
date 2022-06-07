import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/angular';
import { ReadMitiComponent } from '../read-miti/read-miti.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Miti } from '../domain/miti/Miti';
import { CreateMitiComponent } from './create-miti.component';
import userEvent from '@testing-library/user-event';

describe('An employee wants to create...', () => {
  let rendered: RenderResult<ReadMitiComponent>;

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
        mitiId: '2',
      };
      return res(ctx.status(500), ctx.json(dummyMiti));
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
    rendered = await render(ReadMitiComponent, {
      declarations: [CreateMitiComponent, ReadMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('...a lunch table meeting', async () => {
    await rendered.fixture.detectChanges(); // ensure ngOnInit is executed
    await testUtilityFunction;
    await rendered.fixture.detectChanges(); // ensure template is rendered after request

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();
  });

  test('...a lunch table meeting but not without all values filled in', async () => {
    const buttonCreate = screen.getByLabelText('button-create');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonCreate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });

  test('...a lunch table meeting but not without proper capitalization', async () => {
    const buttonCreate = screen.getByLabelText('button-create');

    const alertLocality = screen.getByLabelText('alert-locality');
    const alertLocation = screen.getByLabelText('alert-location');
    const alertFirstName = screen.getByLabelText('alert-firstName');
    const alertLastName = screen.getByLabelText('alert-lastName');

    const alertRegexMessageLocality =
      'Locality must only contain letters and begin with upper case';
    const alertRegexMessageLocation =
      'Location must only contain letters and begin with upper case';
    const alertRegexMessageFirstName =
      'FirstName must only contain letters and begin with upper case';
    const alertRegexMessageLastName =
      'LastName must only contain letters and begin with upper case';

    await userEvent.type(screen.getByLabelText('input-locality'), 'immergrün');
    await userEvent.type(screen.getByLabelText('input-location'), 'oldenburg');
    await userEvent.type(screen.getByLabelText('input-firstName'), 'karl');
    await userEvent.type(screen.getByLabelText('input-lastName'), 'heinz');
    await userEvent.type(screen.getByLabelText('input-time'), '12:59');
    await userEvent.type(screen.getByLabelText('input-date'), '2022-04-30');

    expect(screen.getByLabelText('input-locality')).toHaveValue('immergrün');
    expect(screen.getByLabelText('input-location')).toHaveValue('oldenburg');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('karl');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('heinz');
    expect(screen.getByLabelText('input-time')).toHaveValue('12:59');
    expect(screen.getByLabelText('input-date')).toHaveValue('2022-04-30');

    await fireEvent.click(buttonCreate);

    expect(alertLocality.textContent).toContain(alertRegexMessageLocality);
    expect(alertLocation.textContent).toContain(alertRegexMessageLocation);
    expect(alertFirstName.textContent).toContain(alertRegexMessageFirstName);
    expect(alertLastName.textContent).toContain(alertRegexMessageLastName);
  });

  /*test('...a lunch table meeting, but not twice the same', async () => {
    await rendered.fixture.detectChanges(); // ensure ngOnInit is executed
    await testUtilityFunction;
    await rendered.fixture.detectChanges(); // ensure template is rendered after request

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    const alertMitiAlreadyExists = screen.getByLabelText('alert-miti-already-exists');
    const alertMessageMitiAlreadyExists = 'Employee already has a lunch table meeting on this day!';

    await rendered.fixture.detectChanges(); // ensure ngOnInit is executed
    await testUtilityFunction;
    await rendered.fixture.detectChanges(); // ensure template is rendered after request

    await waitFor(() => alertMitiAlreadyExists)

    expect(alertMitiAlreadyExists.textContent).toContain(alertMessageMitiAlreadyExists);
  });*/
});
