import { Component, OnInit } from '@angular/core';
import { MiTi } from '../domain/miti/MiTi';
import { MiTiService } from '../miti.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  mities?: MiTi[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  nullAlert?: string;

  constructor(private miTiService: MiTiService) {}

  fetchMitis() {
    return this.miTiService.fetchMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log('GET MiTies:', this.mities);
    });
  }

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.firstName ||
      !this.lastName ||
      !this.time
    ) {
      this.nullAlert = 'Null value in any form fields is disallowed';
      console.log('Null value in any form fields is disallowed');
    } else {
      this.submitMiTi();
    }
  }

  submitMiTi() {
    const miTiJson = {
      place: {
        locality: this.locality,
        location: this.location,
      },
      employee: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
      time: this.time,
    };
    console.log('POST MiTi: ', miTiJson);
    return this.miTiService.createMiTi(miTiJson).subscribe((miTiJson) => {
      this.fetchMitis();
    });
  }

  deleteMiTi(miTiId: number) {
    return this.miTiService.deleteMiTi(miTiId).subscribe(() => {
      console.log('DELETE MiTi:', miTiId);
      this.fetchMitis();
    });
  }

  ngOnInit(): void {
    this.fetchMitis();
  }
}
