import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReadMitiComponent } from './read-miti/read-miti.component';
import { UpdateMitiComponent } from './update-miti/update-miti.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AppComponent} from "./app.component";

const routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'mitiapp', component: ReadMitiComponent },
  { path: 'update/:id', component: UpdateMitiComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
