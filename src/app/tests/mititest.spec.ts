import { MiTi } from '../domain/miti/MiTi';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MiTiService } from '../miti.service';
import { of } from 'rxjs';
import { createMock } from '@testing-library/angular/jest-utils';
import { APP_BASE_HREF } from '@angular/common';

describe('MiTi API Test', () => {
  test('should post miti object to api', async () => {
    await render(ViewComponent, {
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [AppComponent, ViewComponent],
      imports: [BrowserModule, FormsModule, HttpClientModule],
    });

    const testMiTi: MiTi[] = [
      {
        place: {
          locality: {
            locality: 'Schloefe',
          },
          location: {
            location: 'Oldenburg',
          },
        },
        employee: {
          firstName: {
            firstName: 'Charlotte',
          },
          lastName: {
            lastName: 'Russell',
          },
        },
        time: '12:00',
      },
    ];

    const miTiService = createMock(MiTiService);
    miTiService.fetchMiTis = jest.fn(() => of(testMiTi));

    const miTiServer = setupServer(
      rest.get('http://localhost:8080/mities', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      }),
      rest.post('http://localhost:8080/mities', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testMiTi));
      })
    );
  });
});
