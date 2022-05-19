import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-update',
  templateUrl: './update-and-delete-miti.component.html',
  styleUrls: ['./update-and-delete-miti.component.css'],
})
export class UpdateAndDeleteMitiComponent implements OnInit {
  mitis?: Miti[];
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  date?: string;
  alertNull?: string;
  mitiId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService
  ) {}

  youShallNotPass() {
    if (
      !this.locality ||
      !this.location ||
      !this.firstName ||
      !this.lastName ||
      !this.time ||
      !this.date
    ) {
      this.alertNull = 'Null values in any form fields are disallowed';
      console.log('Null values in any form fields are disallowed');
    } else {
      this.updateMiti();
    }
  }

  readMitiByMitiId(mitiId: string) {
    return this.mitiService
      .readMitiByMitiId(mitiId)
      .subscribe((response: Miti[]) => {
        this.mitis = response;
        console.log('GET Miti By MitiId:', this.mitiId);
      });
  }

  returnToView() {
    this.router.navigateByUrl('update/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  deleteMiti(mitiId: string) {
    return this.mitiService.deleteMiti(mitiId).subscribe(() => {
      console.log('DELETE Miti:', mitiId);
    });
  }

  updateMiti() {
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
      date: this.date,
    };
    console.log('PUT Miti: ', mitiJson);
    return this.mitiService.updateMiti(this.mitiId, mitiJson).subscribe(() => {
      this.returnToView();
    });
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
    this.readMitiByMitiId(this.mitiId);
  }
}
