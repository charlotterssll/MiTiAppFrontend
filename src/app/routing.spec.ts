import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { AppComponent } from './app.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from './domain/miti/Miti';
import { CreateMitiComponent } from './create-miti/create-miti.component';
import { ReadMitiComponent } from './read-miti/read-miti.component';
import { UpdateMitiComponent } from './update-miti/update-miti.component';
import { DeleteMitiComponent } from './delete-miti/delete-miti.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

describe('An employee wants to route...', () => {
  let rendered: RenderResult<AppComponent, AppComponent>;

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
        setTimeout(resolve, 2000);
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

  //TODO: find the issue why the "testUtilityFunction" does not work here
  test('...from the Update Lunch Table View back to the Read Lunch Table View without editing a lunch table meeting', async () => {
    expect(screen.getByText('Mittagstisch anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
    ).not.toBeInTheDocument();

    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    fireEvent.click(screen.getByLabelText('button-edit'));

    // should be with Id
    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    expect(screen.queryByText('Mittagstisch anlegen')).not.toBeInTheDocument();
    expect(screen.getByText('Mittagstisch bearbeiten')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('button-cancel'));

    await rendered.fixture.detectChanges();
    //TODO
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Mittagstisch anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
    ).not.toBeInTheDocument();
  });

  /*test('...from the Update Lunch Table View back to the Read Lunch Table View without editing a lunch table meeting', async () => {
    expect(screen.getByText('Mittagstisch anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
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
    await testUtilityFunctionWithId;
    await rendered.fixture.detectChanges();

    expect(screen.queryByText('Mittagstisch anlegen')).not.toBeInTheDocument();
    expect(screen.getByText('Mittagstisch bearbeiten')).toBeInTheDocument();

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
    //TODO
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Mittagstisch anlegen')).toBeInTheDocument();
    expect(
      screen.queryByText('Mittagstisch bearbeiten')
    ).not.toBeInTheDocument();
  });*/
});
