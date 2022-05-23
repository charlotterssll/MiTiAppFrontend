import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReadMitiComponent } from './read-miti/read-miti.component';
import { UpdateMitiComponent } from './update-miti/update-miti.component';

const routes = [
  { path: 'update/:id', component: UpdateMitiComponent },
  { path: '', component: ReadMitiComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
