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
  hour!: number;
  minute!: number;


  submitLunch(){
    if(this.hour > 23) {
      alert('hours too damn high');
      this.hour = 0;
    }
    else if (this.minute > 59) {
      alert('minutes too damn high');
      this.minute = 0;
    }
    else {
      console.log(this.locality, this.locality, this.firstname, this.lastname, this.hour, this.minute);
    }
  }

  ngOnInit(): void {
  }
}
