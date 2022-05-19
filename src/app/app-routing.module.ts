import { NgModule } from '@angular/core';
import { UpdateAndDeleteMitiComponent } from './update-and-delete-miti/update-and-delete-miti.component';
import { RouterModule } from '@angular/router';
import { ReadAndCreateMitiComponent } from './read-and-create-miti/read-and-create-miti.component';

const routes = [
  { path: 'update/:id', component: UpdateAndDeleteMitiComponent },
  { path: '', component: ReadAndCreateMitiComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
