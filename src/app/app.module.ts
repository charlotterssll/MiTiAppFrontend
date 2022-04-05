import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { CreatelunchComponent } from './createlunch/createlunch.component';
import { ViewlunchComponent } from './viewlunch/viewlunch.component';
import { ViewLunchComponent } from './view-lunch/view-lunch.component';
import { EditLunchComponent } from './edit-lunch/edit-lunch.component';
import { EditlunchComponent } from './editlunch/editlunch.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatelunchComponent,
    ViewlunchComponent,
    ViewLunchComponent,
    EditLunchComponent,
    EditlunchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
