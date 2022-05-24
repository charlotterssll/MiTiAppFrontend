import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { ReadMitiComponent } from './read-miti.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { AppComponent } from '../app.component';
import { DeleteMitiComponent } from '../delete-miti/delete-miti.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CreateMitiComponent } from '../create-miti/create-miti.component';
import { UpdateMitiComponent } from '../update-miti/update-miti.component';
import { setupServer } from 'msw/node';
import { MockedRequest, rest } from 'msw';
import { Miti } from '../domain/miti/Miti';

describe('Employee wants to read...', () => {
  beforeEach(async () => {
    await render(CreateMitiComponent, {
      imports: [FormsModule, HttpClientModule],
    });
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
