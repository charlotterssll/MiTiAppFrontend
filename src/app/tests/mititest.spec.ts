import { ViewComponent } from '../view/view.component';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MiTi } from '../domain/miti/MiTi';

test('no null values in miti form allowed', async () => {
  await render(ViewComponent, {
    declarations: [AppComponent, ViewComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule],
  });

  const testMiTi: MiTi[] = [
    {
      place: {
        locality: {
          locality: '',
        },
        location: {
          location: '',
        },
      },
      employee: {
        firstName: {
          firstName: '',
        },
        lastName: {
          lastName: '',
        },
      },
      time: '',
    },
  ];

  const locationValue = screen.getByTestId('location');

  //expect(locationValue).toHaveTextContent()
});
