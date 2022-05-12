import { NgModule } from '@angular/core';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes = [
  { path: 'update/:id', component: UpdateComponent },
  { path: '', component: ViewComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
