import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateMitiComponent } from './create-miti/create-miti.component';
import { DeleteMitiComponent } from './delete-miti/delete-miti.component';
import { ReadMitiComponent } from './read-miti/read-miti.component';
import { UpdateMitiComponent } from './update-miti/update-miti.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CreateMitiComponent,
    ReadMitiComponent,
    DeleteMitiComponent,
    UpdateMitiComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
