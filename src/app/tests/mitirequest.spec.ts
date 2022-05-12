import { Miti } from '../domain/miti/Miti';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MitiService } from '../miti.service';
import { of } from 'rxjs';
import { createMock } from '@testing-library/angular/jest-utils';
import { APP_BASE_HREF } from '@angular/common';

describe('Miti API Test', () => {
  test('should post miti object to api', async () => {
    await render(ViewComponent, {
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [AppComponent, ViewComponent],
      imports: [BrowserModule, FormsModule, HttpClientModule],
    });

    const testMiti: Miti[] = [
      {
        mitiId: '1',
        place: {
          locality: {
            value: 'Schloefe',
          },
          location: {
            value: 'Oldenburg',
          },
        },
        employee: {
          firstName: {
            value: 'Charlotte',
          },
          lastName: {
            value: 'Russell',
          },
        },
        time: {
          value: '12:00',
        },
      },
    ];

    const mitiService = createMock(MitiService);
    mitiService.getMiti = jest.fn(() => of(testMiti));

    const mitiServer = setupServer(
      rest.get('http://localhost:8080/miti', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      }),
      rest.post('http://localhost:8080/miti', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testMiti));
      })
    );
  });
});
