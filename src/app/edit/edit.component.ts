import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../miti.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  mitis?: Miti;
  locality?: string;
  location?: string;
  firstName?: string;
  lastName?: string;
  time?: string;
  nullAlert?: string;
  index?: number;
  mitiId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService
  ) {}

  objectKeys = Object.keys;

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

  getMitiByMitiId(mitiId: string) {
    return this.mitiService
      .getMitiByMitiId(mitiId)
      .subscribe((response: Miti) => {
        this.mitis = response;
        console.log('GET Miti By MitiId:', this.mitiId);
      });
  }

  cancelEdit() {
    this.router.navigateByUrl('edit/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  deleteMiti(mitiId: string) {
    return this.mitiService.deleteMiti(mitiId).subscribe(() => {
      console.log('DELETE Miti:', mitiId);
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
    //return this.mitiService.createMiti(mitiJson).subscribe(() => {
    //  this.getMiti();
    //});
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
    this.getMitiByMitiId(this.mitiId);
  }
}
