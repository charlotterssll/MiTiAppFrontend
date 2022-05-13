import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { ViewComponent } from './view.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { AppComponent } from '../app.component';
import { UpdateComponent } from '../update/update.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { createMock } from '@testing-library/angular/jest-utils';

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

  test('should display titles in miti table', async () => {
    expect(screen.getByLabelText('lunch-table-id-title')).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-location-title')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-locality-title')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-firstName-title')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('lunch-table-lastName-title')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('lunch-table-time-title')).toBeInTheDocument();
  });

  test('should not display empty miti values in miti table after button click', async () => {
    const buttonCreate = screen.getByLabelText('button-create');

    await fireEvent.click(buttonCreate);

    expect(screen.queryByLabelText('lunch-table-id')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('lunch-table-location')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('lunch-table-locality')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('lunch-table-firstName')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('lunch-table-lastName')
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText('lunch-table-time')).not.toBeInTheDocument();
  });
});

describe('Routing to Update Component and back to View Component Test', () => {
  beforeEach(async () => {
    await render(AppComponent, {
      declarations: [ViewComponent, UpdateComponent],
      imports: [FormsModule, HttpClientModule, RouterModule, AppRoutingModule],
      routes: [
        { path: 'update/:id', component: UpdateComponent },
        { path: '', component: ViewComponent, pathMatch: 'full' },
      ],
    });
  });

  test('should route to update component', async () => {
    expect(
      screen.queryByText(/Mittagstisch bearbeiten/i)
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByLabelText('button-dummy'));
    expect(
      await screen.queryByText(/Mittagstisch bearbeiten/i)
    ).toBeInTheDocument();
  });

  test('should route to view component', async () => {
    expect(
      screen.queryByText(/Mittagstisch bearbeiten/i)
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByLabelText('button-dummy'));
    expect(
      await screen.queryByText(/Mittagstisch bearbeiten/i)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('button-cancel'));
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Mittagstisch bearbeiten/i)
    );

    expect(
      await screen.queryByText(/Mittagstisch anlegen/i)
    ).toBeInTheDocument();
  });
});
