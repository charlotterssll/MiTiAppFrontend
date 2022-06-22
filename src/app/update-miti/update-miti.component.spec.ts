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
import userEvent from '@testing-library/user-event';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';

/*
describe('An employee does not want to fill in null values when...', () => {
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

  test('...updating any of the input fields in a lunch table meeting', async () => {
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

    const alertNull = screen.getByLabelText('alert-message-null-values');
    const alertNullMessage = 'Bitte keine Felder leer lassen';

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Poststraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('input-locality'));
    await userEvent.clear(screen.getByLabelText('input-location'));
    await userEvent.clear(screen.getByLabelText('input-street'));
    await userEvent.clear(screen.getByLabelText('input-firstName'));
    await userEvent.clear(screen.getByLabelText('input-lastName'));
    await userEvent.clear(screen.getByLabelText('input-abbreviation'));
    await userEvent.clear(screen.getByLabelText('input-time'));
    await userEvent.clear(screen.getByLabelText('input-date'));

    expect(screen.getByLabelText('input-locality')).toHaveValue('');
    expect(screen.getByLabelText('input-location')).toHaveValue('');
    expect(screen.getByLabelText('input-street')).toHaveValue('');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('');
    expect(screen.getByLabelText('input-time')).toHaveValue('');
    expect(screen.getByLabelText('input-date')).toHaveValue('');

    await userEvent.type(screen.getByLabelText('input-locality'), '');
    await userEvent.type(screen.getByLabelText('input-location'), '');
    await userEvent.type(screen.getByLabelText('input-street'), '');
    await userEvent.type(screen.getByLabelText('input-firstName'), '');
    await userEvent.type(screen.getByLabelText('input-lastName'), '');
    await userEvent.type(screen.getByLabelText('input-abbreviation'), '');
    await userEvent.type(screen.getByLabelText('input-time'), '');
    await userEvent.type(screen.getByLabelText('input-date'), '');

    expect(screen.getByLabelText('input-locality')).toHaveValue('');
    expect(screen.getByLabelText('input-location')).toHaveValue('');
    expect(screen.getByLabelText('input-street')).toHaveValue('');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('');
    expect(screen.getByLabelText('input-time')).toHaveValue('');
    expect(screen.getByLabelText('input-date')).toHaveValue('');

    fireEvent.click(screen.getByLabelText('button-update'));

    expect(alertNull.textContent).toContain(alertNullMessage);
  });
});
*/

/*
describe('An employee wants to meet the regular expression requirements when...', () => {
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

  test('...updating a lunch table meeting', async () => {
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

    const alertLocality = screen.getByLabelText(
      'alert-message-invalid-input-locality'
    );
    const alertLocation = screen.getByLabelText(
      'alert-message-invalid-input-location'
    );
    const alertStreet = screen.getByLabelText(
      'alert-message-invalid-input-street'
    );
    const alertFirstName = screen.getByLabelText(
      'alert-message-invalid-input-firstName'
    );
    const alertLastName = screen.getByLabelText(
      'alert-message-invalid-input-lastName'
    );
    const alertAbbreviation = screen.getByLabelText(
      'alert-message-invalid-input-abbreviation'
    );

    const alertRegexMessageLocality =
      'Lokal darf verschiedene Zeichen haben, sowie Groß- und Kleinschreibung beinhalten';
    const alertRegexMessageLocation =
      'Ort darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
    const alertRegexMessageStreet =
      'Straßename darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen, mit einem Leerzeichen' +
      ' getrennt darf eine Hausnummer angegeben werden';
    const alertRegexMessageFirstName =
      'Vorname darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
    const alertRegexMessageLastName =
      'Nachname darf nur Buchstaben und/oder Bindestriche beinhalten und muss mit einem Großbuchstaben beginnen';
    const alertRegexMessageAbbreviation =
      'Kürzel muss aus genau drei Großbuchstaben bestehen';

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Poststraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('input-locality'));
    await userEvent.clear(screen.getByLabelText('input-location'));
    await userEvent.clear(screen.getByLabelText('input-street'));
    await userEvent.clear(screen.getByLabelText('input-firstName'));
    await userEvent.clear(screen.getByLabelText('input-lastName'));
    await userEvent.clear(screen.getByLabelText('input-location'));
    await userEvent.clear(screen.getByLabelText('input-abbreviation'));
    await userEvent.clear(screen.getByLabelText('input-time'));
    await userEvent.clear(screen.getByLabelText('input-date'));

    expect(screen.getByLabelText('input-locality')).toHaveValue('');
    expect(screen.getByLabelText('input-location')).toHaveValue('');
    expect(screen.getByLabelText('input-street')).toHaveValue('');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('');
    expect(screen.getByLabelText('input-time')).toHaveValue('');
    expect(screen.getByLabelText('input-date')).toHaveValue('');

    await userEvent.type(screen.getByLabelText('input-locality'), ' ');
    await userEvent.type(screen.getByLabelText('input-location'), 'oldenburg');
    await userEvent.type(screen.getByLabelText('input-street'), 'poststraße');
    await userEvent.type(screen.getByLabelText('input-firstName'), 'hannelore');
    await userEvent.type(screen.getByLabelText('input-lastName'), 'kranz');
    await userEvent.type(screen.getByLabelText('input-abbreviation'), 'hkr');
    await userEvent.type(screen.getByLabelText('input-time'), '12:00');
    await userEvent.type(screen.getByLabelText('input-date'), '2022-04-01');

    expect(screen.getByLabelText('input-locality')).toHaveValue(' ');
    expect(screen.getByLabelText('input-location')).toHaveValue('oldenburg');
    expect(screen.getByLabelText('input-street')).toHaveValue('poststraße');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('hannelore');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('kranz');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('hkr');
    expect(screen.getByLabelText('input-time')).toHaveValue('12:00');
    expect(screen.getByLabelText('input-date')).toHaveValue('2022-04-01');

    fireEvent.click(screen.getByLabelText('button-update'));

    expect(alertLocality.textContent).toContain(alertRegexMessageLocality);
    expect(alertLocation.textContent).toContain(alertRegexMessageLocation);
    expect(alertStreet.textContent).toContain(alertRegexMessageStreet);
    expect(alertFirstName.textContent).toContain(alertRegexMessageFirstName);
    expect(alertLastName.textContent).toContain(alertRegexMessageLastName);
    expect(alertAbbreviation.textContent).toContain(
      alertRegexMessageAbbreviation
    );
  });
});
*/

describe('An employee wants to update...', () => {
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
      return res((res) => {
        ctx.status(200);
        ctx.json(dummyMiti);
        res.headers.set('Authorization', 'Basic ' + btoa('HKR' + ':' + 'pwd'));
        return res;
      });
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
        ]),
        (res) => {
          res.headers.set(
            'Authorization',
            'Basic ' + btoa('HKR' + ':' + 'pwd')
          );
          return res;
        }
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
        }),
        (res) => {
          res.headers.set(
            'Authorization',
            'Basic ' + btoa('HKR' + ':' + 'pwd')
          );
          return res;
        }
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
      return res((res) => {
        ctx.status(200);
        ctx.json(dummyEditedMiti);
        res.headers.set('Authorization', 'Basic ' + btoa('HKR' + ':' + 'pwd'));
        return res;
      });
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
        ]),
        (res) => {
          res.headers.set(
            'Authorization',
            'Basic ' + btoa('HKR' + ':' + 'pwd')
          );
          return res;
        }
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

  const testUtilityFunctionUpdate = new Promise<void>(async (resolve) => {
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
    const listener = async (request: MockedRequest) => {
      if (
        request.body === dummyEditedMiti &&
        request.url.href === 'http://localhost:8080/miti'
      ) {
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
        AppComponent,
        CreateMitiComponent,
        ReadMitiComponent,
        DeleteMitiComponent,
        UpdateMitiComponent,
        LoginComponent,
        RegistrationComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
      ],
      routes: [
        { path: '', component: LoginComponent, pathMatch: 'full' },
        { path: 'register', component: RegistrationComponent },
        { path: 'mitiapp', component: ReadMitiComponent },
        { path: 'update/:id', component: UpdateMitiComponent },
      ],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('...all the items on an existing lunch table meeting -- dummytest', async () => {
    expect(screen.getByText('Login MitiApp')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung anlegen')
    ).not.toBeInTheDocument();
  });

  /*
  test('...all the items on an existing lunch table meeting', async () => {
    expect(screen.getByText('Login MitiApp')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung anlegen')
    ).not.toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('input-login-abbreviation'));
    await userEvent.clear(screen.getByLabelText('input-login-password'));

    userEvent.type(screen.getByLabelText('input-login-abbreviation'), 'HKR');
    userEvent.type(screen.getByLabelText('input-login-password'), 'pwd');

    expect(screen.getByLabelText('input-login-abbreviation')).toHaveValue(
      'HKR'
    );
    expect(screen.getByLabelText('input-login-password')).toHaveValue('pwd');

    fireEvent.click(screen.getByLabelText('button-login'));

    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    await rendered.fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

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

    await userEvent.clear(screen.getByLabelText('input-locality'));
    await userEvent.clear(screen.getByLabelText('input-location'));
    await userEvent.clear(screen.getByLabelText('input-street'));
    await userEvent.clear(screen.getByLabelText('input-firstName'));
    await userEvent.clear(screen.getByLabelText('input-lastName'));
    await userEvent.clear(screen.getByLabelText('input-location'));
    await userEvent.clear(screen.getByLabelText('input-abbreviation'));
    await userEvent.clear(screen.getByLabelText('input-time'));
    await userEvent.clear(screen.getByLabelText('input-date'));

    expect(screen.getByLabelText('input-locality')).toHaveValue('');
    expect(screen.getByLabelText('input-location')).toHaveValue('');
    expect(screen.getByLabelText('input-street')).toHaveValue('');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('');
    expect(screen.getByLabelText('input-time')).toHaveValue('');
    expect(screen.getByLabelText('input-date')).toHaveValue('');

    userEvent.type(screen.getByLabelText('input-locality'), 'Sultan');
    userEvent.type(screen.getByLabelText('input-location'), 'Oldenburg');
    userEvent.type(screen.getByLabelText('input-street'), 'Ritterstraße');
    userEvent.type(screen.getByLabelText('input-firstName'), 'Hannelore');
    userEvent.type(screen.getByLabelText('input-lastName'), 'Kranz');
    userEvent.type(screen.getByLabelText('input-abbreviation'), 'HKR');
    userEvent.type(screen.getByLabelText('input-time'), '12:00');
    userEvent.type(screen.getByLabelText('input-date'), '2022-04-01');

    expect(screen.getByLabelText('input-locality')).toHaveValue('Sultan');
    expect(screen.getByLabelText('input-location')).toHaveValue('Oldenburg');
    expect(screen.getByLabelText('input-street')).toHaveValue('Ritterstraße');
    expect(screen.getByLabelText('input-firstName')).toHaveValue('Hannelore');
    expect(screen.getByLabelText('input-lastName')).toHaveValue('Kranz');
    expect(screen.getByLabelText('input-abbreviation')).toHaveValue('HKR');
    expect(screen.getByLabelText('input-time')).toHaveValue('12:00');
    expect(screen.getByLabelText('input-date')).toHaveValue('2022-04-01');

    /*fireEvent.click(screen.getByLabelText('button-update'));

    await rendered.fixture.detectChanges();
    await rendered.fixture.detectChanges();
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    await rendered.fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Lunch-Verabredung anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung bearbeiten')
    ).not.toBeInTheDocument();

    await rendered.fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Sultan')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Ritterstraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();*/
});
