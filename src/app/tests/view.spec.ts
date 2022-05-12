import { fireEvent, render, screen } from '@testing-library/angular';
import { ViewComponent } from '../view/view.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';

describe('View Test', () => {
  beforeEach(async () => {
    await render(ViewComponent, {
      declarations: [ViewComponent],
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
    const buttonCreate = screen.getByLabelText('button-create');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonCreate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });
});
