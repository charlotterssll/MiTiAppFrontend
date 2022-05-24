import { UpdateMitiComponent } from './update-miti.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';

describe('Employee wants to update...', () => {
  beforeEach(async () => {
    await render(UpdateMitiComponent, {
      declarations: [UpdateMitiComponent, DeleteMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });

  test('...put a locality into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-locality/i), 'Immergrün');
    expect(screen.getByLabelText(/input-locality/i)).toHaveValue('Immergrün');
  });

  test('...should not allow to submit null values in miti form', async () => {
    const buttonUpdate = screen.getByLabelText('button-update');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonUpdate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });
});
