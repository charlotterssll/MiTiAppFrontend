import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createlunch',
  templateUrl: './createlunch.component.html',
  styleUrls: ['./createlunch.component.css']
})
export class CreatelunchComponent implements OnInit {

  constructor() { }

  locality: string = '';
  firstname: string = '';
  lastname: string = '';


  submitLunch(){
    console.log(this.locality,this.firstname, this.lastname);
  }

  ngOnInit(): void {
  }

}
