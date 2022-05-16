import { fireEvent, render, screen } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { UpdateComponent } from './update.component';
import { createMock } from '@testing-library/angular/jest-utils';

describe('Update Test', () => {
  beforeEach(async () => {
    await render(UpdateComponent, {
      declarations: [UpdateComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });

  test('put a locality into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-locality/i), 'Immergrün');
    expect(screen.getByLabelText(/input-locality/i)).toHaveValue('Immergrün');
  });

  test('put a location value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-location/i), 'Oldenburg');
    expect(screen.getByLabelText(/input-location/i)).toHaveValue('Oldenburg');
  });

  test('put a firstName value into a miti input field', async () => {
    await userEvent.type(
      screen.getByLabelText(/input-firstName/i),
      'Hannelore'
    );
    expect(screen.getByLabelText(/input-firstName/i)).toHaveValue('Hannelore');
  });

  test('put a lastName value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-lastName/i), 'Kranz');
    expect(screen.getByLabelText(/input-lastName/i)).toHaveValue('Kranz');
  });

  test('put a time value into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-time/i), '14:30');
    expect(screen.getByLabelText(/input-time/i)).toHaveValue('14:30');
  });

  test('should not allow to submit null values in miti form', async () => {
    const buttonUpdate = screen.getByLabelText('button-update');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonUpdate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });

  test('should display titles in miti table', async () => {
    expect(
      screen.getByLabelText('lunch-table-id-table-header')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-location-table-header')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-locality-table-header')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-firstName-table-header')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-lastName-table-header')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-time-table-header')
    ).toBeInTheDocument();
  });
});
