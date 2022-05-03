import { fireEvent, render, screen } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MiTi } from '../domain/miti/MiTi';

const renderComponent = render(ViewComponent, {
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  declarations: [AppComponent, ViewComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
});

describe('MiTi Form Test', () => {
  test('should not allow to submit null values in miti form', async () => {
    await renderComponent;

    const testMiTi: MiTi[] = [
      {
        miTiId: 1,
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
        time: '12:00',
      },
    ];

    screen.getByTestId('locality');
    screen.getByTestId('location');
    screen.getByTestId('firstName');
    screen.getByTestId('lastName');
    screen.getByTestId('time');

    const submitButton = screen.getByText(/Speichern/i);
    const nullAlert = screen.getByTestId('alert'); // testet gegen gesamtes div - falsch
    //const nullAlert = screen.getByRole('paragraph', {name: /alert/i})
    const alertNull = 'Null value in any form fields is disallowed';

    fireEvent.click(submitButton);

    expect(nullAlert.textContent).toContain(alertNull);
  });
});
