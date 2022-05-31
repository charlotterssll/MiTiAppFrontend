import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { ActivatedRoute, Router } from '@angular/router';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-updatemiti',
  templateUrl: './update-miti.component.html',
  styleUrls: ['./update-miti.component.css'],
})
export class UpdateMitiComponent implements OnInit {
  mitis: Miti = {
    place: {
      locality: {
        value: '',
      },
      location: {
        value: '',
      },
    },
    employee: {
      firstName: {
        value: '',
      },
      lastName: {
        value: '',
      },
    },
    time: {
      value: '',
    },
    date: {
      value: '',
    },
    mitiId: '',
  };
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
      !this.mitis.place.locality.value ||
      !this.mitis.place.location.value ||
      !this.mitis.employee.firstName.value ||
      !this.mitis.employee.lastName.value ||
      !this.mitis.time.value ||
      !this.mitis.date.value
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
      .subscribe((response: Miti) => {
        this.mitis = {
          place: {
            locality: response.place.locality,
            location: response.place.location,
          },
          employee: {
            firstName: response.employee.firstName,
            lastName: response.employee.lastName,
          },
          time: response.time,
          date: response.date,
          mitiId: response.mitiId,
        };
        console.log('GET Miti By MitiId:', this.mitiId);
      });
  }

  returnToView() {
    this.router.navigateByUrl('update/:id').then(() => {
      this.router.navigate(['']);
    });
  }

  updateMiti() {
    const mitiJson = {
      place: {
        locality: this.mitis.place.locality.value,
        location: this.mitis.place.location.value,
      },
      employee: {
        firstName: this.mitis.employee.firstName.value,
        lastName: this.mitis.employee.lastName.value,
      },
      time: this.mitis.time.value,
      date: this.mitis.date.value,
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
