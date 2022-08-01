import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'admin', component: AdminMenuComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
