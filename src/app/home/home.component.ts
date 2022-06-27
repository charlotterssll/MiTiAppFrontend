import { Component, OnInit } from '@angular/core';
import { MitiService } from '../_services/miti.service';
import { Miti } from '../domain/miti/Miti';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  miti?: Miti[];
  constructor(private mitiService: MitiService) {}

  /*ngOnInit(): void {
    this.mitiService.readMiti().subscribe(
      data => {
        this.miti = data;
      },
      err => {
        this.miti = JSON.parse(err.error).message;
      }
    );
  }*/
}
