import { AfterViewInit, Component } from '@angular/core';
import { MitiService } from './miti-service/miti.service';
import { Miti } from './domain/miti/Miti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MitiAppFrontend';

  constructor(private mitiService: MitiService) {}
  mitis?: Miti[];

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      this.mitis = response;
      console.log('GET Miti:', this.mitis);
    });
  }
}
