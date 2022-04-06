import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { CreatelunchComponent } from './createlunch/createlunch.component';
import { ViewlunchComponent } from './viewlunch/viewlunch.component';
import { EditlunchComponent } from './editlunch/editlunch.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CreatelunchComponent,
    ViewlunchComponent,
    EditlunchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
