import { Component, OnInit } from '@angular/core';
import { Miti } from '../domain/miti/Miti';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-readmiti',
  templateUrl: './read-miti.component.html',
  styleUrls: ['./read-miti.component.css'],
})
export class ReadMitiComponent implements OnInit {
  mitis?: Miti[];

  constructor(private mitiService: MitiService) {}

  readMiti() {
    return this.mitiService.readMiti().subscribe((response: Miti[]) => {
      console.log('GET Miti:', this.mitis);
      this.mitis = response;
    });
  }

  ngOnInit(): void {
    this.readMiti();
  }
}
