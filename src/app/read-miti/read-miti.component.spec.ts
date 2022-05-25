import { render, RenderResult, screen } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { ReadMitiComponent } from './read-miti.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';

describe('An employee wants to read...', () => {
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

  test('...multiple lunch table meetings', async () => {
    await rendered.fixture.detectChanges();
    await testUtilityFunction;
    await rendered.fixture.detectChanges();

    expect(screen.getByText('Immergrün')).toBeInTheDocument();
    expect(screen.getByText('Oldenburg')).toBeInTheDocument();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
    expect(screen.getByText('Kranz')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();

    expect(screen.getByText('Metzger')).toBeInTheDocument();
    expect(screen.getByText('Hannover')).toBeInTheDocument();
    expect(screen.getByText('Karl')).toBeInTheDocument();
    expect(screen.getByText('Heinz')).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
    expect(screen.getByText('2022-05-01')).toBeInTheDocument();
  });
});
