import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getByText, render, screen } from '@testing-library/angular';
import { ReadMitiComponent } from '../read-miti/read-miti.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Miti } from '../domain/miti/Miti';
import { CreateMitiComponent } from './create-miti.component';

describe('Employee wants to create...', () => {
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
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('...a lunch table', async () => {
    const rendered = await render(ReadMitiComponent, {
      declarations: [ReadMitiComponent, CreateMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
    await rendered.fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    await rendered.fixture.detectChanges();
    expect(screen.getByText('Hannelore')).toBeInTheDocument();
  });
});
