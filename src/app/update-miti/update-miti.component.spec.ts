import { UpdateMitiComponent } from './update-miti.component';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';

describe('An employee wants to update...', () => {
  let rendered: RenderResult<UpdateMitiComponent>;

  beforeEach(async () => {
    rendered = await render(UpdateMitiComponent, {
      declarations: [UpdateMitiComponent, DeleteMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
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
