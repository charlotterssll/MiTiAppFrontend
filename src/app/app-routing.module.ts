import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes = [
  { path: 'edit/:id', component: EditComponent },
  { path: '', component: ViewComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
