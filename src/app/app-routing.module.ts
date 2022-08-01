import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListEditorComponent } from './admin-list-editor/admin-list-editor.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: 'list/admin', component: AdminListEditorComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
