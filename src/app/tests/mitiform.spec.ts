import { fireEvent, render, screen } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';

describe('Miti Form Test', () => {
  beforeEach(async () => {
    await render(ViewComponent, {
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [AppComponent, ViewComponent],
      imports: [BrowserModule, FormsModule, HttpClientModule],
    });
  });

  test('put a locality into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/locality/i), 'Immergrün');
    expect(screen.getByLabelText(/locality/i)).toHaveValue('Immergrün');
  });

  test('put a location value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/location/i), 'Oldenburg');
    expect(screen.getByLabelText(/location/i)).toHaveValue('Oldenburg');
  });

  test('put a firstName value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/firstName/i), 'Hannelore');
    expect(screen.getByLabelText(/firstName/i)).toHaveValue('Hannelore');
  });

  test('put a lastName value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/lastName/i), 'Kranz');
    expect(screen.getByLabelText(/lastName/i)).toHaveValue('Kranz');
  });

  test('put a time value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/time/i), '14:30');
    expect(screen.getByLabelText(/time/i)).toHaveValue('14:30');
  });

  test('should not allow to submit null values in miti form', async () => {
    const submitButton = screen.getByTestId('anlegen');
    const nullAlert = screen.getByTestId('alert');
    const alertNull = 'Null values in any form fields are disallowed';

    await fireEvent.click(submitButton);

    expect(nullAlert.textContent).toContain(alertNull);
  });
});
