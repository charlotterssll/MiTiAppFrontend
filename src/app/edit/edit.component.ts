import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiTi } from '../domain/miti/MiTi';
import { MiTiService } from '../miti.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  mities?: MiTi[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  nullAlert?: string;
  index?: number;
  miTiId?: number;

  urlbyid = 'http://localhost:8080/mities/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private miTiService: MiTiService,
    private httpClient: HttpClient
  ) {}

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.firstName ||
      !this.lastName ||
      !this.time
    ) {
      this.nullAlert = 'Null values in any form fields are disallowed';
      console.log('Null values in any form fields are disallowed');
    } else {
      this.editMiTi();
    }
  }

  getMitis() {
    return this.miTiService.getMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log('GET MiTies:', this.mities);
    });
  }

  getMiTiByMiTiId() {
    return this.httpClient
      .get<MiTi[]>(this.urlbyid + this.miTiId)
      .subscribe((response) => {
        console.log('GET MiTi By MiTiId:', this.miTiId);
        this.mities = response;
      });
  }

  cancelEdit() {
    this.router.navigateByUrl('edit/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  deleteMiTi(miTiId: number) {
    return this.miTiService.deleteMiTi(miTiId).subscribe(() => {
      console.log('DELETE MiTi:', miTiId);
      this.getMitis();
    });
  }

  editMiTi() {
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
    console.log('EDIT MiTi: ', miTiJson);
    return this.miTiService.createMiTi(miTiJson).subscribe(() => {
      this.getMitis();
    });
  }

  ngOnInit(): void {
    this.miTiId = this.route.snapshot.params['id'];
    this.getMiTiByMiTiId();
  }
}
