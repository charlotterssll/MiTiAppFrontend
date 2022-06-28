import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { setupServer } from 'msw/node';
import { context, MockedRequest, rest } from 'msw';
import { Miti } from './domain/miti/Miti';
import { CreateMitiComponent } from './create-miti/create-miti.component';
import { ReadMitiComponent } from './read-miti/read-miti.component';
import { UpdateMitiComponent } from './update-miti/update-miti.component';
import { DeleteMitiComponent } from './delete-miti/delete-miti.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import userEvent from '@testing-library/user-event';
import { HomeComponent } from './home/home.component';

describe('An employee wants to route...', () => {
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
      return res(
        ctx.status(200),
        ctx.json(dummyMiti),
        ctx.cookie('auth-token', 'abc-123')
      );
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
        AppComponent,
        CreateMitiComponent,
        ReadMitiComponent,
        DeleteMitiComponent,
        UpdateMitiComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
      ],
      routes: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent },
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

  test('...from the Update Lunch Table View back to the Read Lunch Table View without editing a lunch table meeting (with content validation) -- dummytest', async () => {
    expect(screen.getByText('Willkommen bei der MitiApp')).toBeInTheDocument();
    expect(
      screen.queryByText('Lunch-Verabredung anlegen')
    ).not.toBeInTheDocument();

    expect(screen.getByLabelText('nav-link-login')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('nav-link-login'));

    expect(screen.getByText('Login MitiApp')).toBeInTheDocument();
    expect(
      screen.queryByText('Willkommen bei der MitiApp')
    ).not.toBeInTheDocument();

    userEvent.type(screen.getByLabelText('input-login-abbreviation'), 'HKR');
    userEvent.type(screen.getByLabelText('input-login-password'), 'qwertz');

    fireEvent.click(screen.getByLabelText('button-login'));
    /*
    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Lunch-Verabredung anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Login MitiApp')
    ).not.toBeInTheDocument();
  });


  test('...from the Update Lunch Table View back to the Read Lunch Table View without editing a lunch table meeting (with content validation)', async () => {
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

    fireEvent.click(screen.getByLabelText('button-cancel'));

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

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Poststraße')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('HKR')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();
  */
  });
});
