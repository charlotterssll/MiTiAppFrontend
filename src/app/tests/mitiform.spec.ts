import { fireEvent, render, screen } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Miti } from '../domain/miti/Miti';
import userEvent from "@testing-library/user-event";

const renderComponent = render(ViewComponent, {
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  declarations: [AppComponent, ViewComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
});

describe('Miti Form Test', () => {

  test('should not allow to submit null values in miti form', async () => {
    await renderComponent;

    const submitButton = screen.getByTestId('anlegen');
    const nullAlert = screen.getByTestId('alert');
    const alertNull = 'Null values in any form fields are disallowed';

    fireEvent.click(submitButton);

    expect(nullAlert.textContent).toContain(alertNull);
  });

  test('put a value into locality input', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/'locality'/i), 'Immergrün')
    expect(screen.getByLabelText(/locality/i)).toHaveValue('Immergrün')
  });

  test('put a value into location input', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/location/i), 'Oldenburg')
    expect(screen.getByLabelText(/location/i)).toHaveValue('Oldenburg')
  });

  test('put a value into firstName input', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/firstName/i), 'Hannelore')
    expect(screen.getByLabelText(/firstName/i)).toHaveValue('Hannelore')
  });

  test('put a value into lastName input', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/lastName/i), 'Kranz')
    expect(screen.getByLabelText(/lastName/i)).toHaveValue('Kranz')
  });

  test('put a value into time input', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/time/i), '14:30')
    expect(screen.getByLabelText(/time/i)).toHaveValue('14:30')
  });

  /*
  test('received a proper miti', async () => {
    await renderComponent;

    userEvent.type(screen.getByLabelText(/locality/i), 'Immergrün');
    userEvent.type(screen.getByLabelText(/location/i), 'Oldenburg');
    userEvent.type(screen.getByLabelText(/firstName/i), 'Hannelore');
    userEvent.type(screen.getByLabelText(/lastName/i), 'Kranz');
    userEvent.type(screen.getByLabelText(/time/i), '14:30');

    const submitButton = screen.getByTestId('anlegen');
    fireEvent.click(submitButton)

    expect(screen.getByLabelText(/mitiList/i)).toHaveTextContent('Immergrün');
  });
  */
  /*
  const testMiti =
    {
      mitiId: '1',
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
        value: '14:30',
      },
    };
*/
});
