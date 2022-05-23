import { render } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMitiComponent } from './delete-miti.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { UpdateMitiComponent } from '../update-miti/update-miti.component';

describe('Employee wants to...', () => {
  beforeEach(async () => {
    await render(DeleteMitiComponent, {
      declarations: [DeleteMitiComponent, UpdateMitiComponent],
      imports: [FormsModule, HttpClientModule],
    });
  });

  test('...delete an existing lunch table', async () => {});
});
