import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../miti.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  miti?: Miti[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  nullAlert?: string;
  index?: number;
  mitiId?: number;
  mitiArray: Miti[] = [];

  urlbyid = 'http://localhost:8080/miti/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService,
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
      this.editMiti();
    }
  }

  getMiti() {
    return this.mitiService.getMiti().subscribe((response: Miti[]) => {
      this.miti = response;
      console.log('GET Miti:', this.miti);
    });
  }

  getMitiByMitiId() {
    return this.httpClient
      .get<Miti[]>(this.urlbyid + this.mitiId)
      .subscribe((response: Miti[]) => {
        this.miti = response;
        console.log('GET Miti By MitiId:', this.mitiId);
        console.log(this.mitiArray);
      });
  }

  cancelEdit() {
    this.router.navigateByUrl('edit/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  deleteMiti(mitiId: number) {
    return this.mitiService.deleteMiti(mitiId).subscribe(() => {
      console.log('DELETE Miti:', mitiId);
      this.getMiti();
    });
  }

  editMiti() {
    const mitiJson = {
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
    console.log('EDIT Miti: ', mitiJson);
    return this.mitiService.createMiti(mitiJson).subscribe(() => {
      this.getMiti();
    });
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
    this.getMitiByMitiId();
  }
}
