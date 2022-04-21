import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MiTi } from "../domain/entities/MiTi";
import { MiTiService } from '../miti.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  mities?: MiTi[];

  constructor(private miTiService: MiTiService) {}

  fetchMitis() {
    return this.miTiService.fetchMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log(this.mities);
    })
  }

  submitMiTi(f: NgForm) {
    return this.miTiService
      .createMiTi(f)
      .subscribe((response: MiTi[]) => {
        console.log('Added MiTi:', response);
        this.fetchMitis();
      });
  }

  ngOnInit(): void {
    this.fetchMitis();
  }
}
