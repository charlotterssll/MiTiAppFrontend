import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MiTiNotNested } from "../domain/entities/MiTiNotNested";
import { MiTiService } from "../miti.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

// mities?: MiTi[];
  mitiesNotNested?: MiTiNotNested[];

  constructor(private miTiService: MiTiService) {};

  /*fetchMitis() {
    return this.fetchDataService.fetchMiTis().subscribe((response: MiTi[]) => {
      this.mities = response;
      console.log(this.mities);
    })
  }*/

  fetchMitisNotNested() {
    return this.miTiService.fetchMiTisNotNested().subscribe((response: MiTiNotNested[]) => {
      this.mitiesNotNested = response;
      console.log(this.mitiesNotNested);
    })
  }

  submitMiTiNotNested(f: NgForm) {
    return this.miTiService.createMiTiNotNested(f).subscribe((response: MiTiNotNested[]) => {
      console.log('Added MiTiNotNested:', response);
      this.fetchMitisNotNested();
    })
  }

  ngOnInit(): void {
    this.fetchMitisNotNested();
  }
}
