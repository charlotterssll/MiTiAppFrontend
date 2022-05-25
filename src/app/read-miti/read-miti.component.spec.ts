import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { CreateMitiComponent } from '../create-miti/create-miti.component';

describe('An employee wants to read...', () => {
  let rendered: RenderResult<CreateMitiComponent>;

  beforeEach(async () => {
    rendered = await render(CreateMitiComponent, {
      imports: [FormsModule, HttpClientModule],
    });
  });
  afterEach(() => {
    rendered.fixture.destroy();
  });
  test('put a locality into a miti input field', async () => {
    await userEvent.type(screen.getByLabelText(/input-locality/i), 'Immergrün');
    expect(screen.getByLabelText(/input-locality/i)).toHaveValue('Immergrün');
  });
  test('should not allow to submit null values in miti form', async () => {
    const buttonCreate = screen.getByLabelText('button-create');
    const alertNull = screen.getByLabelText('alert-null');
    const alertNullMessage = 'Null values in any form fields are disallowed';

    await fireEvent.click(buttonCreate);

    expect(alertNull.textContent).toContain(alertNullMessage);
  });
});
