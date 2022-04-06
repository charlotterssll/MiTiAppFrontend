import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createlunch',
  templateUrl: './createlunch.component.html',
  styleUrls: ['./createlunch.component.css']
})
export class CreatelunchComponent implements OnInit {

  constructor() { }

  locality!: string;
  location!: string;
  firstname!: string;
  lastname!: string;
  time!: string;

  submitLunch(){
    console.log(this.locality, this.location, this.firstname, this.lastname, this.time);
  }
  ngOnInit(): void {
  }
}
